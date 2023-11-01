import { configureStore, combineReducers } from '@reduxjs/toolkit';
import imageReducer from './reducers/imageReducer';

// Define the root state type
type RootState = ReturnType<typeof rootReducer>;

// Combine reducers if you have more than one
const rootReducer = combineReducers({
    imageStore: imageReducer,
});

// Create the store
export const store = configureStore({
    reducer: rootReducer,
});
