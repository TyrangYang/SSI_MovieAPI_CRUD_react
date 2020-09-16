import { configureStore } from '@reduxjs/toolkit';
import movieDataReducer from '../slicers/movieDataSlice';
export default configureStore({
    reducer: {
        allMovies: movieDataReducer,
    },
});
