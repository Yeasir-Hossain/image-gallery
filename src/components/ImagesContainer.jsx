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
        <div className='grid grid-cols-4 first:row-span-2 px-6'>
            {
                images.map((image, index) =>
                    <Image key={index} img={image} />
                )
            }
        </div>
    )
}
