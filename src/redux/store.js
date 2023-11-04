import { configureStore, combineReducers } from '@reduxjs/toolkit';
import imageReducer from './reducers/imageReducer';


// Initializing reducers
const rootReducer = combineReducers({
    imageStore: imageReducer,
});

// Creating the store
export const store = configureStore({
    reducer: rootReducer,
});
