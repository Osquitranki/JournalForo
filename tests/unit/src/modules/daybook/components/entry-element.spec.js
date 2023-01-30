import { shallowMount } from "@vue/test-utils";
import EntryElement from "@/modules/daybook/components/Entry-element.vue"
import {journalState} from "../../../mock-data/test-journal-state"


describe('pruebas en Entry component', () => {

const mockRouter = {
        push : jest.fn()
}


const wrapper = shallowMount(EntryElement , {
        props: {
            entry :  journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
             }
 
        }
})


/*  test('debe de hacer match con el snapshop', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de redireccionar al hacer clik en el entry container', async() => {
    const entryContainer = wrapper.find('.entry-container')
    entryContainer.trigger('click')
    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith(
        {name: 'entry',
         params: {id:journalState.entries[0].id}
        }
    )
    expect(mockRouter.push).toHaveBeenCalledWith(
        {name: 'entry',
         params: {id:expect.any(String)}
        }
    )
  })*/

  test('propiedades computadas', () => {
    console.log('VM', wrapper.vm.day)
    console.log('VM', wrapper.vm.month)
    console.log('VM', wrapper.vm.yearDay)
    expect(wrapper.vm.day).toBe(17)
    expect(wrapper.vm.month).toBe('Enero')
    expect(wrapper.vm.yearDay).toBe('2023, Martes')
  })
})
