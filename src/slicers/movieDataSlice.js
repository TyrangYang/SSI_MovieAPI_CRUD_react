import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const movieDataSlice = createSlice({
    name: 'movieDataSlice',
    initialState: {
        movies: [],
        initialized: false,
        favoriteMovies: [],
    },

    reducers: {
        setMovies: (state, action) => {
            return {
                movies: action.payload,
                initialized: true,
                favoriteMovies: [],
            };
        },
        addMovies: (state, action) => {
            return {
                ...state,
                movies: [action.payload, ...state.movies],
            };
        },
        deleteMovies: (state, action) => {
            return {
                ...state,
                movies: state.movies.filter((e) => e.id !== action.payload.id),
                // delete favorite
                favoriteMovies: state.favoriteMovies.filter(
                    (e) => e.id !== action.payload.id
                ),
            };
        },
        addFavoriteMovie: (state, action) => {
            return {
                ...state,
                movies: state.movies.map((e) => {
                    let newItem = { ...e };
                    if (newItem.id === action.payload.id) {
                        newItem.isFavorite = true;
                    }
                    return newItem;
                }),
                favoriteMovies: [
                    ...(state.favoriteMovies || []),
                    {
                        ...state.movies
                            .filter((e) => e.id === action.payload.id)
                            .map((e) => {
                                let newItem = { ...e };
                                newItem.isFavorite = true;
                                return newItem;
                            })[0],
                    },
                ],
            };
        },
        removeFavoriteMovie: (state, action) => {
            return {
                ...state,
                movies: state.movies.map((e) => {
                    let newItem = { ...e };
                    if (newItem.id === action.payload.id) {
                        newItem.isFavorite = false;
                    }
                    return newItem;
                }),
                favoriteMovies: state.favoriteMovies.filter(
                    (e) => e.id !== action.payload.id
                ),
            };
        },

        editMovie: (state, action) => {
            return {
                ...state,
                movies: state.movies.map((e) => {
                    let newItem = { ...e };
                    if (e.id === action.payload.id) {
                        newItem.popularity = action.payload.popularity;
                        newItem.title = action.payload.title;
                    }
                    return newItem;
                }),
                favoriteMovies: state.favoriteMovies.map((e) => {
                    let newItem = { ...e };
                    if (e.id === action.payload.id) {
                        newItem.popularity = action.payload.popularity;
                        newItem.title = action.payload.title;
                    }
                    return newItem;
                }),
            };
        },
    },
});

export const {
    addMovies,
    deleteMovies,
    setMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
    editMovie,
} = movieDataSlice.actions;

export const fetchMovies = (page) => (dispatch) => {
    const apiURL = 'https://api.themoviedb.org/3/movie';
    const apiKey = 'ae09140db64f8c19eae245a3b5feed8a';
    axios
        .get(`${apiURL}/popular?api_key=${apiKey}&language=en-US&page=${page}`)
        .then(({ data }) => {
            const res = data.results.map((element) => {
                return {
                    id: element.id,
                    popularity: element.popularity,
                    title: element.title,
                    isFavorite: false,
                };
            });
            dispatch(setMovies(res));
        });
};

export default movieDataSlice.reducer;
