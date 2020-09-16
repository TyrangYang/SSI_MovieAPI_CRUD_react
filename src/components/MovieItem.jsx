import React from 'react';
import {
    deleteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
} from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';

// import styling
import { Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faTrashAlt,
    faEdit,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import styleGroup from '../css/MovieItem.module.css';

export default function MovieItem({
    id,
    popularity,
    title,
    isFavorite,
    setInitEditCard, // passing initial value for edit card component
    setDisplayEditCard, // trigger a signal to show edit card component
}) {
    const dispatch = useDispatch();

    return (
        <div className={styleGroup.itemContainer}>
            <Paper elevation={3}>
                {isFavorite ? (
                    <FontAwesomeIcon
                        className={`${styleGroup.svgBtn}`}
                        icon={faStar}
                        onClick={() => dispatch(removeFavoriteMovie({ id }))}
                    />
                ) : (
                    <FontAwesomeIcon
                        className={`${styleGroup.svgBtn}`}
                        icon={farStar}
                        onClick={() => dispatch(addFavoriteMovie({ id }))}
                    />
                )}
                <p> {title} </p>
                <p> {popularity} </p>
                <FontAwesomeIcon
                    className={`${styleGroup.svgBtn}`}
                    icon={faTrashAlt}
                    onClick={() => {
                        if (window.confirm('Want deleted?'))
                            dispatch(deleteMovies({ id }));
                    }}
                />
                <FontAwesomeIcon
                    className={`${styleGroup.svgBtn}`}
                    icon={faEdit}
                    onClick={() => {
                        setDisplayEditCard(true);
                        setInitEditCard({ id, title, popularity });
                    }}
                />
                <FontAwesomeIcon
                    className={`${styleGroup.svgBtn}`}
                    icon={faBars}
                />
            </Paper>
        </div>
    );
}
