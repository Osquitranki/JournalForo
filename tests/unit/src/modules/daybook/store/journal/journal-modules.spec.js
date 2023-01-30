
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'

import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

    const updateEnty =
    {
        id : '-NM--H8T0VdmSg8hbfrY', 
        date: 1673963528548,
        picture: 'https://res.cloudinary.com/dfwfeejj8/image/upload/v1673967144/o4wtzvgagbdtwkfehqjf.jpg',
        'text': 'Elefantemod en la prueba'
    }
    
describe('Vuex - Pruebas en el Journal Module', () => {
  /*  test('Estado inicial. Debe de tener este estado', () => {
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    test('mutations: setEntries', () => {
        const store = createVuexStore({isLoading: true, entries:[]})
        store.commit('journal/setEntries',journalState.entries)
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('mutation updateEntry', () => {
        const store = createVuexStore( journalState )
        const updateEnty =
        {
            id : '-NM--H8T0VdmSg8hbfrY', 
            date: 1673963528548,
            picture: 'https://res.cloudinary.com/dfwfeejj8/image/upload/v1673967144/o4wtzvgagbdtwkfehqjf.jpg',
            'text': 'Elefantemod en la prueba'
        }
        store.commit('journal/updateEntries',updateEnty)
        const storeEntries = store.state.journal.entries;
        expect( storeEntries.length ).toBe(2)
        expect( storeEntries.find( e => e.id === updateEnty.id)).toEqual(updateEnty)
    })


    test('mutation add y delete', () => {
        const store = createVuexStore( journalState )
        const addEnty =
        {
            id : 'ABC-123', 
            date: 1673963528548,
            picture: 'https://res.cloudinary.com/dfwfeejj8/image/upload/v1673967144/o4wtzvgagbdtwkfehqjf.jpg',
            'text': 'Elefantemod en la prueba AÑADO'
        }

        store.commit('journal/addEntries',addEnty)
        var storeEntries = store.state.journal.entries;
        expect( storeEntries.length ).toBe(3)
        expect(storeEntries.find(e => e.id==='ABC-123')).toBeTruthy()
        expect(storeEntries.find(e => e.id==='ABC-123').id).toBe('ABC-123')           

        store.commit('journal/deleteEntries',addEnty.id)
        storeEntries = store.state.journal.entries;
        expect( storeEntries.length ).toBe(2)
        expect(storeEntries.find(e => e.id==='ABC-123')).toBeFalsy()        
    })*/

    //getter

    test('getters', () => {
        const store = createVuexStore( journalState )
        expect(store.getters['journal/getEntriesByTerm']('')).toHaveLength(2)
        const [entry1,entry2] = journalState.entries
        expect(store.getters['journal/getEntriesByTerm']('capp')).toEqual([entry2])
        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1)
    })
/*
    test('actions load', async() => {
        const store = createVuexStore( {isLoading: true, entries: []} )
        console.log('action load test', store.state.journal.entries.length)
        await store.dispatch('journal/loadEntries')
        expect (store.state.journal.entries.length).toBe(5)
    })
*/
    test('actions update', async() => {
        const store = createVuexStore( journalState )
        console.log('action update test', store.state.journal.entries.length)
        const updateEnty =
        {
            id : '-NM--H8T0VdmSg8hbfrY', 
            date: 1673963528548,
            picture: 'https://res.cloudinary.com/dfwfeejj8/image/upload/v1673967144/o4wtzvgagbdtwkfehqjf.jpg',
            text: 'Elefantemod en la prueba AÑADO22222',
            otroCampo : true,
            otrosMAS: {a:1}
        }
        await store.dispatch('journal/updateEntries',updateEnty)
        expect (store.state.journal.entries.length).toBe(2)

        expect ( store.state.journal.entries.find(e => e.id === updateEnty.id) ).toEqual(
            {
                id : '-NM--H8T0VdmSg8hbfrY', 
                date: 1673963528548,
                picture: 'https://res.cloudinary.com/dfwfeejj8/image/upload/v1673967144/o4wtzvgagbdtwkfehqjf.jpg',
                text: 'Elefantemod en la prueba AÑADO22222'
            }
        )
    })

    test('actions create y delete', async() => {
        const store = createVuexStore( journalState )
        const newEntry = {
            date : '',
            text: 'nueva entrada desde pruebas'
        }
        const id =  await store.dispatch('journal/createEntries',newEntry)
        expect ( store.state.journal.entries.find(e => e.id === id) ).toBeTruthy()
        expect( typeof id).toBe('string')
        await store.dispatch('journal/deleteEntries',id)
        expect ( store.state.journal.entries.find(e => e.id === id) ).toBeFalsy()
    })
})
