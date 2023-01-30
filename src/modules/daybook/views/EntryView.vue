<template>
<div v-if="entry">
  <div  class="entry-title d-flex justify-content-between p-2"
   @click="router.push({name: 'entry', param: {id: entry.id}})">
    <div>
      <span class="text-success fs-3 fw-blod">{{day}}</span>
      <span class="mx-1 fs-3">{{month}}</span>
      <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
    </div>
    <div>
      <input type="file" 
             @change="onSelectedImage"
             ref="imageSelector"
             v-show="false"/>
      <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry" >Borrar
        <i class="fa fa-trash-alt" />
      </button>
         <button  @click="onSelectImage" class="btn btn-primary">Subir Foto
        <i class="fa fa-upload" />
      </button>
    </div>
  </div>
  <hr>
  <div class="d-flex flex-column px-3 h-75">
   <textarea v-model="entry.text" placeholder="¿Que sucedio hoy?"/>
  </div>
  </div>
  <Fab icono="fa-save" 
    @on:click="saveEntry"
  />
  <img v-if="entry.picture && !localImage" :src="entry.picture"
       alt="entry-picture" 
      class="img-thumbnail"/>

  <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail">
  

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters,mapActions} from 'vuex'
import getDayMontYear from '../helpers/getDayMonthYear'

import uploadImage from '../helpers/uploadImage'

import Swal from 'sweetalert2'

export default {
  name: 'EntryView',
  props: {
    id: {
      type:String, required: true
    }
  },
 components: {     
   Fab: defineAsyncComponent(()=>import('../components/Fab-comp.vue'))
  },
  data(){
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },
  computed: {
   ...mapGetters('journal',['getEntryById']),
   day() {
    const {day} = getDayMontYear(this.entry.date)
    return day
   },
   month() {
    const {month} = getDayMontYear(this.entry.date)
    return month
   },
   yearDay() {
    const {yearDay} = getDayMontYear(this.entry.date)
    return yearDay
   }
  },
  methods: {
    ...mapActions('journal',['updateEntries','createEntries','deleteEntries']),
    loadEntry() {
      let entry;
      if(this.id === 'new') {
         entry = {
          text: 'Nueva Entrada',
          date: new Date().getTime()
         } 
      } else {
        entry = this.getEntryById(this.id)
        if(!entry) return this.$router.push({name: 'no-entry'})
      }
       console.log("LoadEntry:entry",entry)
       this.entry = entry
       console.log("LoadEntry:this.entry",this.entry)
    },
    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()
      if(this.file) {
        const picture = await uploadImage(this.file)
        this.entry.picture = picture
      }
      console.log('saveEntry')
      if(this.entry.id) {
        await this.updateEntries(this.entry)
      } else {
        console.log("post nueva entrda")
        const ids = await this.createEntries(this.entry)
        console.log("IDxxx",ids)
        this.$router.push({ name: 'entry', params: { id: ids} })
      }
      this.file=null
      this.localImage=null
      Swal.fire('GUardado','Entrada registrada con éxito','success')
    },
    async onDeleteEntry() {
      const result = await Swal.fire({
        title: '¿Estas seguro?',
        text: 'Una vez borrado no se recupera.',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro'

      })
      console.log('result',result)
      var {value} = result
      console.log('value',value)
      if(value) {
        new Swal({
          title: 'Espere por favor',
        allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntries(this.entry.id)
        this.$router.push({ name: 'no-entry' })
        Swal.fire('Eliminado','','success')
      }

    },
    onSelectedImage(event) {
      const file = event.target.files[0]
      if (!file) {
        this.localImage=null
        this.file=null
        return
      }
      this.file=file
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage() {
      this.$refs.imageSelector.click()
    }
  },
  created() {
    this.loadEntry()
  },
  watch: {
    id(){
      this.loadEntry()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>
