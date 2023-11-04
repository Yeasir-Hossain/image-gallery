import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your image data
interface IImage {
    id: string;
    image: string;
    session?: string;
}

// Define the initial state type
interface ImageState {
    images: IImage[];
    selectedImages: IImage[];
}

const initialState: ImageState = {
    images: [],
    selectedImages: [],
};

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<{ target: string; value: any }>) => {
            state[action.payload.target] = action.payload.value;
        },
        addNewImage: (state, action: PayloadAction<IImage>) => {
            state.images = [action.payload, ...state.images];
        },
        selectImage: (state, action: PayloadAction<IImage>) => {
            state.selectedImages = [action.payload, ...state.selectedImages];
        },
        removeSelectedImage: (state, action: PayloadAction<IImage>) => {
            state.selectedImages = state.selectedImages.filter((image) => image.id !== action.payload.id);
        },
        updateImageList: (state, action: PayloadAction<Partial<IImage>>) => {
            // Define how you want to update the image list
            // For example: state.images = state.images.map(image => image.id === action.payload.id ? { ...image, ...action.payload } : image);
        },
        removeImage: (state, action: PayloadAction<IImage>) => {
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
