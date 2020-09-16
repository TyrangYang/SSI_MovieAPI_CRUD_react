import React from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { editMovie } from '../slicers/movieDataSlice';
import { useDispatch } from 'react-redux';

export default function EditCard({
    initState: { id, title, popularity },
    setDisplayEditCard,
}) {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    return (
        <div>
            <Container>
                <Paper elevation={3}>
                    <span
                        onClick={() => {
                            setDisplayEditCard(false);
                        }}
                    >
                        &times;
                    </span>
                    <form
                        onSubmit={handleSubmit((data) => {
                            dispatch(
                                editMovie({
                                    id,
                                    title: data.title,
                                    popularity: data.popularity,
                                })
                            );
                            setDisplayEditCard(false);
                        })}
                    >
                        <TextField
                            label="TITLE:"
                            name="title"
                            inputRef={register()}
                            defaultValue={title}
                            required
                        />
                        <TextField
                            label="POPULARITY:"
                            name="popularity"
                            type="tel"
                            inputRef={register()}
                            defaultValue={popularity}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            CHANGE
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}
