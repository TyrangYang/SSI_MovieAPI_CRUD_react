import React from 'react';
import { TextField, Button, Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { addMovies } from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';
import styleGroup from '../css/AddNewMovie.module.css';

export default function AddNewMovie() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    return (
        <Container maxWidth="md">
            <form
                className={styleGroup.formContainer}
                onSubmit={handleSubmit((data) => {
                    dispatch(addMovies({ ...data, id: v4() }));
                })}
            >
                <TextField
                    label="TITLE:"
                    name="title"
                    inputRef={register()}
                    required
                />
                <TextField
                    label="POPULARITY:"
                    name="popularity"
                    type="tel"
                    inputRef={register()}
                    required
                />
                <div className={styleGroup.buttonContainer}>
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                </div>
            </form>
        </Container>
    );
}
