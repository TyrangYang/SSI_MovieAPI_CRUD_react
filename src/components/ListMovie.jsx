import React from 'react';
import MovieItem from './MovieItem';
import { Pagination } from '@material-ui/lab';

export default function ListMovie({
    moviesToDisplay,
    curPageNum,
    setCurPageNum,
    totalPages,
    setInitEditCard,
    setDisplayEditCard,
}) {
    return (
        <div>
            {moviesToDisplay.map((e) => (
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
            <Pagination
                count={totalPages}
                page={curPageNum}
                onChange={(e, val) => setCurPageNum(val)}
                color="primary"
            />
        </div>
    );
}
