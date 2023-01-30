
import { shallowMount } from '@vue/test-utils'
import About from '@/views/AboutView'

describe('About Component', () => {
    test('debe de coincidir con el snapshot', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
