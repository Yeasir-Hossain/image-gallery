import React from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import hitToast from '../utils/hitToast'
import { setValue } from '../redux/reducers/imageReducer';


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
        e.target.checked ?
            dispatch(setValue({ target: 'selectedImages', value: images })) :
            dispatch(setValue({ target: 'selectedImages', value: [] }))
    }

    // This funtion  is used to delete the selected images
    const handleDelete = () => {
        hitToast('Deleted', 'success')
    };

    return (
        <div className='w-full flex justify-between items-center border-gray-200 border-b-2 px-5 pb-2'>
            <div>
                <input type="checkbox" name="selected" id='selected' onChange={(e) => handleCheckAll(e)} checked={selectedImages.length > 0} />
                <label htmlFor="selected" className='font-semibold ml-2 cursor-pointer'>{selectedImages.length} Files Selected</label>
            </div>
            <button onClick={handleDelete} className='text-red-600 px-1'>
                Delete Files
            </button>
        </div>
    )
}
