import React from 'react'
import { Actions } from '../components/Actions'
import { ImagesContainer } from '../components/ImagesContainer'

export const ImageGallery = () => {
    return (
        <div className='flex flex-col w-full h-full shadow-xl rounded-md bg-white py-4'>
            <Actions />
            <ImagesContainer />
        </div>
    )
}
