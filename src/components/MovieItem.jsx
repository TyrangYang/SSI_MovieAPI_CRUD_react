import React from 'react';
import {
    deleteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
} from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faTrashAlt,
    faEdit,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

export default function MovieItem({
    id,
    popularity,
    title,
    isFavorite,
    setInitEditCard,
    setDisplayEditCard,
}) {
    const dispatch = useDispatch();

    return (
        <div>
            <Paper elevation={3}>
                {isFavorite ? (
                    <FontAwesomeIcon
                        icon={faStar}
                        onClick={() => dispatch(removeFavoriteMovie({ id }))}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={farStar}
                        onClick={() => dispatch(addFavoriteMovie({ id }))}
                    />
                )}
                <p> {popularity} </p>
                <p> {title} </p>
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => {
                        if (window.confirm('Want deleted?'))
                            dispatch(deleteMovies({ id }));
                    }}
                />
                <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                        setDisplayEditCard(true);
                        setInitEditCard({ id, title, popularity });
                    }}
                />
                <FontAwesomeIcon icon={faBars} />
            </Paper>
        </div>
    );
}
