import { createSlice } from '@reduxjs/toolkit';

//Initial state for the reducer
const initialState = {
    images: [],
    selectedImages: [],
};

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state[action.payload.target] = action.payload.value;
        },
        addNewImage: (state, action) => {
            state.images = [...state.images, action.payload];
        },
        selectImage: (state, action) => {
            state.selectedImages = [action.payload, ...state.selectedImages];
        },
        removeSelectedImage: (state, action) => {
            state.selectedImages = state.selectedImages.filter((image) => image.id !== action.payload.id);
        },
        updateImageList: (state) => {
            state.images = state.images
                .filter((image) => !state.selectedImages.some((selectedImage) => selectedImage.id === image.id));
            state.selectedImages = [];
        },
        removeImage: (state, action) => {
            state.images = state.images.filter((image) => image.id !== action.payload.id);
        },
    },
});

export const {
    setValue,
    addNewImage,
    updateImageList,
    removeImage,
    selectImage,
    removeSelectedImage
} = imageSlice.actions;
export default imageSlice.reducer;
