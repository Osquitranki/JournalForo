import daybookRouter from '@/modules/daybook/router'

describe('pruebas en el router de daybook', () => {
   /*test('el router debe de tener esta configuracion', async () => {
        expect( daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                }
        
            ]
        })

       //expect( ( await daybookRouter.children[0].component()).default.name).toBe('noEntrySelected')
       //expect( ( await daybookRouter.children[1].component()).default.name).toBe('EntryView')

       const promiseRouter = []
       daybookRouter.children.forEach(child => promiseRouter.push(child.component()))
       const routers = (await Promise.all(promiseRouter)).map( resul => resul.default.name)
       console.log('names', routers)

       expect(routers).toContain('noEntrySelected')
       expect(routers).toContain('entry')

   })*/


   test('Debe de retornar el id de la ruta', () => {
     const route = {
        params: {
            id: 'ABC-123'
        }
     }

     const entryRoute = daybookRouter.children.find(route => route.name=='entry')
     expect(entryRoute.props(route).id).toBe('ABC-123')
   })
})
