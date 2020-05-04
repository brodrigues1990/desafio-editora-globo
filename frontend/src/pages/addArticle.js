import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import api from '../services/api';
import Paper from '@material-ui/core/Paper';

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
            alert("erro no cadastro: campos vazios");
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
                alert("erro na edicao");
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

    useEffect((ArticleId) => {
        if (ArticleId) {
            loadArticlesEdit(ArticleId);
        }
    }, []);

    const classes = useStyles();
    return (
        <>
            <Paper elevation={2}>
                <form>
                    <input
                        placeholder="Titulo"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Conteudo"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />



                </form>
            </Paper>
            <Fab color="primary" className={classes.fab} onClick={(e) => handleArticle(e)}>
                <SaveIcon />
            </Fab>
        </>
    );
}

export default AddArticle;