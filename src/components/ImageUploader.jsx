import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { terminal } from '../terminal/Terminal';
import { useDispatch } from 'react-redux';
import { addNewImage } from '../redux/reducers/imageReducer';
import nProgress from 'nprogress';
import hitToast from '../utils/hitToast';

/**
 * This component ploads and image to the server
 * Checks the file extension and the size of the image which is max 5MB
 * @returns react component
 */
export const ImageUploader = () => {
    const dispatch = useDispatch();
    // Check the file extension and size of the image
    const isImageValid = (file) => {
        const allowedFormats = ['.png', '.jpg', '.jpeg', '.webp'];
        return (
            allowedFormats.some((format) => file.name.endsWith(format)) &&
            file.size <= 5 * 1024 * 1024
        );
    };

    // parse the image after onChange event
    const handleFileChange = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            const validImages = Array.from(files).filter(isImageValid);
            if (validImages.length > 0) {
                nProgress.start();
                const imageArray = validImages.map((file) => file);
                terminal
                    .request({ name: 'uploadImage', body: { image: imageArray } })
                    .then(({ data }) => {
                        if (data.length > 0) {
                            data.forEach((imageData) => {
                                dispatch(addNewImage(imageData));
                            });
                            nProgress.done();
                        }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => nProgress.done());
            } else {
                hitToast('Invalid file format or size for one or more images.', 'error');
            }
        }
    };


    return (
        <div className='first:w-full first:h-full first:py-5 lg:w-44 lg:h-44 border-2 border-dashed border-gray-200 rounded-lg'>
            <input type="file"
                name="image"
                id="image"
                multiple
                accept=".png, .jpg, .jpeg, .webp"
                className='hidden'
                onChange={handleFileChange}
            />
            <label htmlFor="image" className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
                <BiImageAdd size={24} />
                <p>Add images</p>
            </label>

        </div>
    );
};
