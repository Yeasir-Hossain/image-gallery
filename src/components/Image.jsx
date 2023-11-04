/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeSelectedImage, selectImage, setValue } from '../redux/reducers/imageReducer';

export const Image = ({ image, index }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [dropIndex, setDropIndex] = useState(null);

    const { images, selectedImages } = useSelector((state) => ({
        images: state.imageStore.images,
        selectedImages: state.imageStore.selectedImages
    }), shallowEqual);

    useEffect(() => {
        setChecked(selectedImages.find(i => i.id === image.id) ? true : false);
    }, [selectedImages, image.id]);

    const handleDragOver = (e) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text/plain');
        const dropIndex = index;
        if (dropIndex !== dragIndex) {
            setHovered(true);
            setDropIndex(index);
        }
    };

    const handleDragLeave = () => {
        setHovered(false);
        setDropIndex(null);
    };

    const handleDragAndDrop = (e) => {
        const dragIndex = e.dataTransfer.getData('text/plain');
        const dropIndex = index;
        const updatedItems = [...images];
        const dragItem = updatedItems[dragIndex];
        updatedItems.splice(dragIndex, 1);
        updatedItems.splice(dropIndex, 0, dragItem);
        dispatch(setValue({ target: 'images', value: updatedItems }));
        setHovered(false);
        setDropIndex(null);
    };;

    return (
        <>
            <div
                className={`relative group first:row-span-2 first:col-span-2 first:w-full first:h-full lg:w-44 lg:h-44 border-2 border-gray-200 rounded-lg`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDragAndDrop(e)}
            >
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
            </div>
        </>
    );
};
