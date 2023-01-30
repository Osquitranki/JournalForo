import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from "axios";

import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: 'dfwfeejj8',
    api_key: '156597959969257',
    api_secret: 'gkoBaHFnQBRRyp6W0QPB1ubQJtw'

})

describe('Pruebas en el UploadImage', () => {
    test('debe de carar un archivo y retornar el url', async( )  => {
        const { data } = await axios.get('https://res.cloudinary.com/dfwfeejj8/image/upload/v1673966378/fw1zi3kjkdhdgzdwee9h.jpg',{
            responseType: 'arraybuffer'
        })
        const file = new File([  data ],'foto.jpg')
        const url = await uploadImage(file)
        expect( typeof url).toBe('string')

        console.log('URL:',url)

        const segments = url.split('/')
        const imgId = segments[segments.length -1 ].replace('.jpg','')
        await cloudinary.v2.api.delete_resources( imgId)

    })
})
