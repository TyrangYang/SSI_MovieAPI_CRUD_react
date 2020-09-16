import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import EditCard from './EditCard';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../slicers/movieDataSlice';
import { Tabs, Tab } from '@material-ui/core';

export default function ListAllMovie() {
    const dispatch = useDispatch();
    const { movies, favoriteMovies, initialized } = useSelector(
        (state) => state.allMovies
    );

    useEffect(() => {
        dispatch(fetchMovies(1));
    }, [dispatch]);

    const [initEditCard, setInitEditCard] = useState({
        id: null,
        title: '123',
        popularity: 100,
    });

    const [displayEditCard, setDisplayEditCard] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div>
            {displayEditCard && (
                <EditCard
                    initState={initEditCard}
                    setDisplayEditCard={setDisplayEditCard}
                />
            )}

            <Tabs
                value={tabIndex}
                onChange={(e, val) => {
                    setTabIndex(val);
                }}
            >
                <Tab label="All Movies" />
                <Tab label="Favorite Movies" />
            </Tabs>
            {initialized &&
                tabIndex === 0 &&
                movies.map((e) => (
                    <MovieItem
                        key={e.id}
                        id={e.id}
                        popularity={e.popularity}
                        title={e.title}
                        isFavorite={e.isFavorite}
                        setInitEditCard={setInitEditCard}
                        setDisplayEditCard={setDisplayEditCard}
                    />
                ))}
            {tabIndex === 1 &&
                favoriteMovies.map((e) => (
                    <MovieItem
                        key={e.id + 'fav'}
                        id={e.id}
                        popularity={e.popularity}
                        title={e.title}
                        isFavorite={e.isFavorite}
                        setInitEditCard={setInitEditCard}
                        setDisplayEditCard={setDisplayEditCard}
                    />
                ))}
        </div>
    );
}
