import React from 'react';
import {
    deleteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
} from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';

// import styling
import { Paper, Grid } from '@material-ui/core';
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
                <Grid container className={styleGroup.contentContainer}>
                    <Grid item xs={1}>
                        {isFavorite ? (
                            <FontAwesomeIcon
                                className={`${styleGroup.svgBtn} ${styleGroup.svgBtnStar}`}
                                icon={faStar}
                                onClick={() =>
                                    dispatch(removeFavoriteMovie({ id }))
                                }
                            />
                        ) : (
                            <FontAwesomeIcon
                                className={`${styleGroup.svgBtn} ${styleGroup.svgBtnStar}`}
                                icon={farStar}
                                onClick={() =>
                                    dispatch(addFavoriteMovie({ id }))
                                }
                            />
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <p> {title} </p>
                    </Grid>
                    <Grid item xs={2}>
                        <p> {popularity} </p>
                    </Grid>
                    <Grid item xs={1}>
                        <FontAwesomeIcon
                            className={`${styleGroup.svgBtn} ${styleGroup.svgBtnDel}`}
                            icon={faTrashAlt}
                            onClick={() => {
                                if (window.confirm('Want deleted?'))
                                    dispatch(deleteMovies({ id }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <FontAwesomeIcon
                            className={`${styleGroup.svgBtn}`}
                            icon={faEdit}
                            onClick={() => {
                                setDisplayEditCard(true);
                                setInitEditCard({ id, title, popularity });
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <FontAwesomeIcon
                            className={`${styleGroup.svgBtn}`}
                            icon={faBars}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
