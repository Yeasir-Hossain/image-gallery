import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Image } from './Image'

/**
 * This component renders the image
 * @returns react component
 */
export const ImagesContainer = () => {
    const { images } = useSelector((state) => ({
        images: state.imageStore.images
    }), shallowEqual)
    return (
        <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5 py-5'>
            {
                images.map((image) =>
                    <Image key={image.id} image={image} />
                )
            }
            <div className='w-full h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg'>
                Image add
            </div>
        </div>
    )
}
