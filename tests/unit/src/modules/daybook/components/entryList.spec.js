import { shallowMount } from '@vue/test-utils'
import { journalState } from '../../../mock-data/test-journal-state'
import { createStore } from 'vuex'
import EntryList from '@/modules/daybook/components/Entry-list.vue'
import journal from '@/modules/daybook/store/journal'


const createVuexStore = ( initialState ) => {
    createStore( {
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })
}

describe('Pruebas en el entryList', () => {
   const store = createVuexStore(journalState)
   

   const mockRouter = {
      push: jest.fn()
   }

   const wrapper = shallowMount(EntryList, {
    global: {
        mocks: {
            $router: mockRouter
        },
        plugins: [ store ]
    }
   }) ;



   
    test('debe de llamar al getEntryByTerm sin termino y mostrar dos entradas',() => {
         console.log(wrapper.html())
    })
})
