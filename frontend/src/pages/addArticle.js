import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, TextField, Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import api from '../services/api';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const AddArticle = (props) => {

    let history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const ArticleId = props.match.params.id;
    const data = {
        title,
        content
    }

    async function handleArticle(e) {
        e.preventDefault();
        if (data.title === null || data.title === '' || data.content === null || data.content === '') {
            ToastsStore.error("erro no cadastro: campos vazios");
        } else {
            try {
                if (ArticleId !== undefined) {
                    // Editar Noticia
                    await api.put(`articles/${ArticleId}`, data);
                } else {
                    // Salvar Noticia
                    await api.post(`articles`, data);
                }
                history.goBack();
            } catch (err) {
                ToastsStore.error("erro na edição");
            }

        }
    }

    const loadArticlesEdit = async (ArticleId) => {
        await api.get(`articles/${ArticleId}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
    }

    useEffect(() => {
        if (ArticleId) {
            loadArticlesEdit(ArticleId);
        }
    }, []);

    const classes = useStyles();
    console.log(title);
    console.log(content);
    return (
        <>
            <Paper elevation={2}>
                <Grid container>
                    <Grid xs>
                        <form className={classes.root} autoComplete="on">
                            <TextField
                                id="outlined-multiline"
                                label="Titulo"
                                defaultValue={title}
                                variant="outlined"
                                multiline
                                rows={1}
                                onChange={e => setTitle(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Conteudo"
                                defaultValue={content}
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={e => setContent(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Paper>
            <Fab color="primary" className={classes.fab} onClick={(e) => handleArticle(e)}>
                <SaveIcon />
            </Fab>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} lightBackground />
        </>
    );
}

export default AddArticle;