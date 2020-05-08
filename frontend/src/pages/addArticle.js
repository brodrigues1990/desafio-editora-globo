import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, TextField, Grid } from '@material-ui/core';
import { Save as SaveIcon, Close as CloseIcon } from '@material-ui/icons';
import api from '../services/api';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    form: {
        width: '100%',
    },
    textGrid: {
        width: '100%',
        margin: theme.spacing(2, 2),
    },
    textField: {
        width: '80%',
    },
    closeIcon: {
        textAlign: 'right',
    }
}));

const AddArticle = (props) => {

    const classes = useStyles();
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const createdAt = new Date();
    const ArticleId = props.match.params.id;
    const data = {
        title,
        content,
        createdAt
    }
    
    async function handleArticle(e) {
        e.preventDefault();
        if (data.title === null || data.title === '' || data.content === null || data.content === '') {
            ToastsStore.error("Erro no cadastro: campos vazios");
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
                ToastsStore.error("Erro na edição");
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

    return (
        <>
            <Paper elevation={2}>
                <Grid container>
                    <Grid container item className={classes.textGrid} justify="flex-end">
                        <Link to="/">
                            <CloseIcon color="action" style={{ fontSize: 30 }} />
                        </Link>
                    </Grid>
                    <form className={classes.form} autoComplete="on">
                        <Grid container item className={classes.textGrid} justify="center">
                            <TextField
                                label="Titulo"
                                defaultValue={title}
                                variant="outlined"
                                multiline
                                rows={1}
                                onChange={e => setTitle(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid container className={classes.textGrid} item justify="center">
                            <TextField
                                label="Conteudo"
                                defaultValue={content}
                                variant="outlined"
                                multiline
                                rows={15}
                                onChange={e => setContent(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                    </form>
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