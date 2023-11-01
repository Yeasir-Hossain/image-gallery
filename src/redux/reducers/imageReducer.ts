import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import imageData from '../../assets/imageData';

// Define the type for your image data
interface IImage {
    id: number;
    image: string;
    session?: string;
}

// Define the initial state type
interface ImageState {
    images: IImage[];
    selectedImages: IImage[];
}

const initialState: ImageState = {
    images: [...imageData],
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
} = imageSlice.actions;
export default imageSlice.reducer;
