import axios from 'axios'

//import journalApi from '@/modules/daybook/helpers/journalApi'

export const loadEntries =async ({commit}) => {
   const {data} = await journalApi.get('/entries.json')
   if(!data) {
    commit('setEntries',[])
    return
   } 
   console.log('DATA:', data)
   const entries = []
   for(let id of Object.keys(data)) {
    entries.push({
        id,
        ...data[id]
    })
   }
   commit('setEntries',entries)
}

export const updateEntries =async ({commit},entrie) => {
   const {date, picture, text} = entrie
   const entrySave = {
    date,
    picture,
    text
   }
   console.log('updateEntry action:' ,entrySave)
   const resp = await journalApi.put(`/entries/${entrie.id}.json`,entrySave)
   entrySave.id=entrie.id
   commit('updateEntries',{ ...entrySave})
}

export const createEntries =async ({commit},entrie) => {
    const {date, picture, text} = entrie
    const entrySave = {
     date,
     picture,
     text
    }
    const data = await journalApi.post(`/entries.json`,entrySave)
    entrySave.id = data.data.name
    commit('addEntries',{ ...entrySave})
    return  entrySave.id
}

export const deleteEntries =async ({commit},id) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntries',id)
}

const journalApi = axios.create({
    baseURL: 'https://vue-demos-30ac7-default-rtdb.europe-west1.firebasedatabase.app'
})
