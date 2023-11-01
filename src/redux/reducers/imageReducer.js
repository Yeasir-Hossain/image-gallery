import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        selectedImages: [],
    },
    reducers: {
        setValue: (state, action) => {
            state[action.payload.target] = action.payload.value;
        },
        addNewImage: (state, action) => {
            state.images = [action.payload, ...state.images];
        },
        updateImageList: (state, action) => {

        },
        removeImage: (state, action) => {
            state.images = state.images.filter((image) => image.id !== action.payload.id);
        },
    },
});

export const {
    setValue,
    addNewImage,
    updateImage,
    removeImage,
} = imageSlice.actions;
export default imageSlice.reducer;