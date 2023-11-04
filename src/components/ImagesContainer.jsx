import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Image } from './Image';
import { ImageUploader } from './ImageUploader';

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
                images.map((image) =>
                    <Image key={image.id} image={image} />
                )
            }
            <ImageUploader />
        </div>
    );
};
