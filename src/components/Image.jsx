/* eslint-disable react/prop-types */
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

/**
 * This component shows the images in grid view
 * @returns react component
 */
export const Image = ({ img, index }) => {
    // state to checked
    // condition for checking
    // checkbox
    // hover class
    // checked class
    const { images, selectedImages } = useSelector((state) => ({
        images: state.imageStore.images,
        selectedImages: state.imageStore.selectedImages
    }), shallowEqual)
    return (
        <div className='relative group first:row-span-2 first:col-span-2 first:w-full first:h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg'>
            <input
                // onClick={}
                type="checkbox"
                name={`selected_${index}`}
                id={`selected_${index}`}
                // value={true}
                className='absolute z-50 top-[5px] left-[5px] w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'
            />
            <label htmlFor={`selected_${index}`}>
                <div className='absolute w-full h-full z-20 top-0 left-0 opacity-40 group-hover:backdrop-blur-sm bg-transparent group-hover:bg-black transition-all duration-500 ease-in-out'></div>
                <img src={image} className='relative w-full h-full' />
            </label>
        </div>
    )
}
