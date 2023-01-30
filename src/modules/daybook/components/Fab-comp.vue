<template>
  <button class="btn btn-primary">
   <i class="fa fa-2x" :class="icono" @click="$emit('on:click')"/>

  </button>
</template>

<script>
export default {
props: {
  icono : {
    type: String, default: 'fa-plus',required: false
  }
}

}
</script>

<style lang="scss" scoped>
button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
}

</style>
