/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeSelectedImage, selectImage, setValue } from '../redux/reducers/imageReducer';
import { EmptyImage } from './EmptyImage';


/**
 * This component renders a single image
 * @param {Object} image - The image object from the backend.
 * @param {Integer} index - The index of the image object.
 * @param {Boolean} isDragging - Whether the image is being dragged or not.
 * @param {Object} style - The style for dragging the image.
 * @returns react component
 */
export const Image = forwardRef(({ image, index, isDragging, style, ...props }, ref) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const { selectedImages } = useSelector((state) => ({
        images: state.imageStore.images,
        selectedImages: state.imageStore.selectedImages
    }), shallowEqual);

    useEffect(() => {
        setChecked(selectedImages.find(i => i.id === image.id) ? true : false);
    }, [selectedImages, image.id]);

    return (
        <div
            ref={ref}
            {...props}
            style={{ "transformOrigin": "0 0", ...style }}
            className={`relative group first:row-span-2 first:col-span-2 first:w-full first:h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg overflow-hidden`}
        >
            <input
                onChange={() => checked ? dispatch(removeSelectedImage(image)) : dispatch(selectImage(image))}
                type="checkbox"
                name={`${image.id}`}
                id={`${image.id}`}
                checked={checked}
                className={`absolute z-50 top-[20px] left-[20px] w-5 h-5 ${checked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 ease-in-out`}
            />
            <label htmlFor={`${image.id}`} className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
                <div className={`absolute w-full h-full z-20 top-0 left-0 opacity-40 group-hover:backdrop-blur-sm ${checked ? 'bg-white' : 'bg-transparent'} group-hover:bg-black transition-all duration-500 ease-in-out`}></div>
                <img src={image?.path} className={`${isDragging ? 'opacity-0 bg-gray-200' : 'opacity-100'} relative w-full h-full`} />
            </label>
        </div>
    );
});
