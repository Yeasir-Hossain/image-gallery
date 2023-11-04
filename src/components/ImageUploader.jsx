import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { terminal } from '../terminal/Terminal';
import { useDispatch } from 'react-redux';
import { addNewImage } from '../redux/reducers/imageReducer';
import nProgress from 'nprogress';

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
        const file = event.target.files[0];

        if (file) {
            if (isImageValid(file)) {
                nProgress.start();
                terminal.request({ name: 'uploadImage', body: { image: file } }).then(({ data }) => {
                    if (data.id) {
                        dispatch(addNewImage(data));
                        nProgress.done();
                    }
                })
                    .catch(err => console.log(err)).finally(() => nProgress.done());
            } else {
                alert('Invalid file format or size. Please select a valid image.');
            }
        }
    };

    return (
        <div className='first:w-full first:h-full first:py-5 lg:w-44 lg:h-44 border-2 border-dashed border-gray-200 rounded-lg'>
            <input type="file"
                name="image"
                id="image"
                accept=".png, .jpg, .jpeg, .webp"
                className='hidden'
                onChange={handleFileChange}
            />
            <label htmlFor="image" className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
                <BiImageAdd size={24} />
                <p>Add image</p>
            </label>

        </div>
    );
};
