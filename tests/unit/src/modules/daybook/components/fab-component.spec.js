import { shallowMount } from '@vue/test-utils'
import FabComp from '@/modules/daybook/components/Fab-comp'

describe('Prueba del Fab Component', () => {
  
    test('debe mostrar el icono por defectpo', () => {
        const wrapper = shallowMount(FabComp)
        const ico = wrapper.find('i')
        console.log(ico.classes())
        expect(ico.classes('fa-plus')).toBeTruthy()
    })

    test('debe mostrar el icono por argumento', () => {
        const wrapper = shallowMount(FabComp, {
            props: {
                icono : 'fa-circle'
            }
        })
        const ico = wrapper.find('i')
        expect(ico.classes('fa-circle')).toBeTruthy()

    })

    test('debe emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount(FabComp)
        wrapper.find('button').trigger('click')
        console.log('wrapper.emitted:',wrapper.emitted('click'))
        expect(wrapper.emitted('click')).toHaveLength(1)
    })

})
