import React from 'react';
import {
    deleteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
} from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';

// import styling
import { Paper, Grid } from '@material-ui/core';
import {
    AiFillDelete,
    AiFillStar,
    AiOutlineStar,
    AiFillEdit,
} from 'react-icons/ai';
import { MdDragHandle } from 'react-icons/md';
import styleGroup from '../css/MovieItem.module.css';

function MovieItem({
    id,
    popularity,
    title,
    isFavorite,
    setInitEditCard, // passing initial value for edit card component
    setDisplayEditCard, // trigger a signal to show edit card component
}) {
    const dispatch = useDispatch();
    // console.log('render items');
    return (
        <div className={styleGroup.itemContainer}>
            <Paper elevation={3}>
                <Grid container className={styleGroup.contentContainer}>
                    <Grid item xs={1}>
                        {isFavorite ? (
                            <AiFillStar
                                className={`${styleGroup.svgBtn} ${styleGroup.svgBtnStar}`}
                                onClick={() =>
                                    dispatch(removeFavoriteMovie({ id }))
                                }
                            />
                        ) : (
                            <AiOutlineStar
                                className={`${styleGroup.svgBtn} ${styleGroup.svgBtnStar}`}
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
                        <AiFillDelete
                            className={`${styleGroup.svgBtn} ${styleGroup.svgBtnDel}`}
                            onClick={() => {
                                if (window.confirm('Want deleted?'))
                                    dispatch(deleteMovies({ id }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <AiFillEdit
                            className={`${styleGroup.svgBtn}`}
                            onClick={() => {
                                setDisplayEditCard(true);
                                setInitEditCard({ id, title, popularity });
                            }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <MdDragHandle className={`${styleGroup.svgBtn}`} />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default React.memo(MovieItem);
