import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import hitToast from '../utils/hitToast';
import { setValue, updateImageList } from '../redux/reducers/imageReducer';
import { terminal } from '../terminal/Terminal';
import nProgress from 'nprogress';


/**
 * This component handles the actions of the image gallery
 * There is a checkbox for seletction and deselecting
 * There is a button for deleteing the selected images
 * @returns react component
 */
export const Actions = () => {
    const dispatch = useDispatch();
    const { images, selectedImages } = useSelector((state) => ({
        images: state.imageStore.images,
        selectedImages: state.imageStore.selectedImages
    }), shallowEqual);

    // This funtion  is used to select all the images and also deselect any images that has been selected
    const handleCheckAll = (e) => {
        const selectedImagesValue = e.target.checked ? images : [];
        dispatch(setValue({ target: 'selectedImages', value: selectedImagesValue }));
    };

    // This funtion  is used to delete the selected images
    const handleDelete = () => {
        // delete image that has been uploaded by the user from the database
        // other images will be deleted temporarily from the redux store
        const imagesToDelete = selectedImages.filter(image => image.user !== undefined).map(i => i.id);
        if (imagesToDelete.length > 0) {
            nProgress.start();
            terminal.request({ name: 'deleteImages', body: { id: imagesToDelete } }).then(({ data }) => {
                if (data.status) {
                    dispatch(updateImageList());
                    nProgress.done();
                    hitToast('Deleted', 'success');
                }
            }).catch(err => console.log(err)).finally(() => nProgress.done());
        }
        else {
            hitToast('Deleted', 'success');
            dispatch(updateImageList());
        }
    };

    return (
        <div className='w-full flex justify-between items-center border-gray-200 border-b-2 px-5 pb-2'>
            <div>
                <input type="checkbox" name="selected" id='selected' onChange={(e) => handleCheckAll(e)} checked={selectedImages.length > 0} />
                <label htmlFor="selected" className='font-semibold ml-2 cursor-pointer'>{selectedImages.length} Files Selected</label>
            </div>
            <button onClick={handleDelete} disabled={!selectedImages.length} className='bg-red-500 rounded-md text-white px-2 py-1 disabled:opacity-70'>
                Delete Files
            </button>
        </div>
    );
};
