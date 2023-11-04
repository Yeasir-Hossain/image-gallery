import React from 'react';

/**
 * This component ploads and image to the server
 * Checks the file extension and the size of the image which is max 5MB
 * @returns react component
 */
export const ImageUploader = () => {

    // Check the file extension and size of the image
    const isImageValid = (file) => {
        const allowedFormats = ['.png', '.jpg', '.jpeg', '.webp'];
        return (
            allowedFormats.some((format) => file.name.endsWith(format)) &&
            file.size <= 5 * 1024 * 1024 // 5MB in bytes
        );
    };

    // parse the image after onChange event
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (isImageValid(file)) {
                console.log('Image selected:', file.name);
            } else {
                alert('Invalid file format or size. Please select a valid image.');
            }
        }
    };


    return (
        <div className='w-full h-full lg:w-44 lg:h-44 border-2 border-dashed border-gray-200 rounded-lg'>
            <input type="file" name="image" id="image" accept=".png, .jpg, .jpeg, .webp" className='hidden' />
            <label htmlFor="image" className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
                Image add
            </label>

        </div>
    );
};
