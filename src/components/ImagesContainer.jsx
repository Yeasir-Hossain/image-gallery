import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Image } from './Image';
import { ImageUploader } from './ImageUploader';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setValue } from '../redux/reducers/imageReducer';

/**
 * This component renders the image
 * @returns react component
 */
export const ImagesContainer = () => {
    const { images } = useSelector((state) => ({
        images: state.imageStore.images
    }), shallowEqual);

    return (
        <div className={`grid ${images.length < 1 ? 'grid-cols-1' : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4 px-5 py-5`}>
            {
                images.map((image, index) =>
                    <Image key={image.id} image={image} index={index} />
                )
            }
            <ImageUploader />
        </div>
    );
};
