import React, { useState, useEffect, useMemo } from 'react';
import MovieItem from './MovieItem';
import EditCard from './EditCard';
import ListMovie from './ListMovie';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../slicers/movieDataSlice';

// import style
import {
    Tabs,
    Tab,
    Container,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import styleGroup from '../css/MovieDisplayPanel.module.css';

export default function MovieDisplayPanel() {
    const dispatch = useDispatch();

    // get state from redux
    const { movies, favoriteMovies, initialized, totalPages } = useSelector(
        (state) => state.allMovies
    );

    // set current page number
    const [curPageNum, setCurPageNum] = useState(1);
    // set edit card state
    const [initEditCard, setInitEditCard] = useState({
        id: null,
        title: '123',
        popularity: 100,
    });
    const [displayEditCard, setDisplayEditCard] = useState(false);
    // set tab state
    const [tabIndex, setTabIndex] = useState(0);
    // set sort state
    const [isSortByName, setIsSortByName] = useState(false);

    // fetch data
    useEffect(() => {
        dispatch(fetchMovies(curPageNum));
    }, [dispatch, curPageNum]);

    // preprocess display data
    const moviesToDisplay = useMemo(() => {
        if (isSortByName) {
            return [...movies].sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }
        return movies;
    }, [movies, isSortByName]);

    const favoriteMoviesToDisplay = useMemo(() => {
        if (isSortByName) {
            return [...favoriteMovies].sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }
        return favoriteMovies;
    }, [favoriteMovies, isSortByName]);

    // console.log('render panel');
    return (
        <Container maxWidth="md">
            {/* edit card */}
            {displayEditCard && (
                <EditCard
                    initState={initEditCard}
                    setDisplayEditCard={setDisplayEditCard}
                />
            )}
            {/* tab */}
            <div className={styleGroup.tabContainer}>
                <Tabs
                    value={tabIndex}
                    onChange={(e, val) => {
                        setTabIndex(val);
                    }}
                >
                    <Tab label="All Movies" />
                    <Tab label="Favorite Movies" />
                </Tabs>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={isSortByName}
                            onChange={() => {
                                setIsSortByName(!isSortByName);
                            }}
                        />
                    }
                    label="Sort by Name"
                />
            </div>

            {/* display movies */}
            {initialized && tabIndex === 0 && (
                <ListMovie
                    moviesToDisplay={moviesToDisplay}
                    curPageNum={curPageNum} // for pagination
                    setCurPageNum={setCurPageNum} // for pagination
                    totalPages={totalPages} // for pagination
                    setInitEditCard={setInitEditCard} // for control edit card
                    setDisplayEditCard={setDisplayEditCard} // for control edit card
                />
            )}
            {/* display favorite movies */}
            {tabIndex === 1 &&
                (favoriteMoviesToDisplay.length === 0 ? (
                    <div className={styleGroup.emptyText}>
                        <h2>No favorite Movie currently</h2>
                    </div>
                ) : (
                    favoriteMoviesToDisplay.map((e) => (
                        <MovieItem
                            key={e.id + '_fav'}
                            id={e.id}
                            popularity={e.popularity}
                            title={e.title}
                            isFavorite={e.isFavorite}
                            setInitEditCard={setInitEditCard}
                            setDisplayEditCard={setDisplayEditCard}
                        />
                    ))
                ))}
        </Container>
    );
}
