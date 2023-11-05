/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeSelectedImage, selectImage, setValue } from '../redux/reducers/imageReducer';
import { EmptyImage } from './EmptyImage';


/**
 * This component renders a single image
 * @param {Object} image - The image object from the backend.
 * @param {Integer} index - The index of the image object.
 * @returns react component
 */
export const Image = ({ image, index }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const dropIndexRef = useRef(null);

    const { images, selectedImages } = useSelector((state) => ({
        images: state.imageStore.images,
        selectedImages: state.imageStore.selectedImages
    }), shallowEqual);

    useEffect(() => {
        setChecked(selectedImages.find(i => i.id === image.id) ? true : false);
    }, [selectedImages, image.id]);

    // This function is used to handle drag start event
    const handleDragStart = (e) => {
        const dragIndex = index;
        e.dataTransfer.setData('text/plain', dragIndex);
    };

    // This function is used to handle drag over an element event
    const handleDragOver = (e) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text/plain');
        const dropIndex = index;
        if (dropIndex !== dragIndex) {
            setHovered(true);
            dropIndexRef.current = dropIndex;
        }
    };

    // This function is used to handle drag leave after the dragging is over
    const handleDragLeave = () => {
        setHovered(false);
        dropIndexRef.current = null;

    };

    // This function is used to rearrange the items after the drop event
    const handleDragAndDrop = (e) => {
        const dragIndex = e.dataTransfer.getData('text/plain');
        const dropIndex = index;
        if (dropIndex !== dragIndex) {
            const updatedItems = [...images];
            const dragItem = updatedItems[dragIndex];
            updatedItems.splice(dragIndex, 1);
            updatedItems.splice(dropIndex, 0, dragItem);
            dispatch(setValue({ target: 'images', value: updatedItems }));
            setHovered(false);
            dropIndexRef.current = dropIndex;
        };
    };

    return (
        <>
            <div
                className={`relative group first:row-span-2 first:col-span-2 first:w-full first:h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg`}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragAndDrop}
            >
                {hovered ?
                    <EmptyImage /> :
                    <>
                        <input
                            onChange={() => checked ? dispatch(removeSelectedImage(image)) : dispatch(selectImage(image))}
                            type="checkbox"
                            name={`${image.id}`}
                            id={`${image.id}`}
                            checked={checked}
                            className={`absolute z-50 top-[20px] left-[20px] w-5 h-5 ${checked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 ease-in-out`}
                        />
                        <label htmlFor={`${image.id}`}>
                            <div className={`absolute w-full h-full z-20 top-0 left-0 opacity-40 group-hover:backdrop-blur-sm ${checked ? 'bg-white' : 'bg-transparent'} group-hover:bg-black transition-all duration-500 ease-in-out`}></div>
                            <img src={image?.path} className="relative w-full h-full" />
                        </label>
                    </>
                }
            </div>
        </>
    );
};
