import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
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

        if (ArticleId !== undefined) {
            // Editar Noticia
            try {
                await api.put(`articles/${ArticleId}`, data);
                history.goBack();
            } catch (err) {
                alert("erro na edicao");
            }
        } else {
            // Salvar Noticia
            try {
                await api.post(`articles`, data);
                history.goBack();
            } catch (err) {
                alert("erro no cadastro");
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
    return (
        <>
            <span>
                NOVA NOTICIA
            </span>
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

                <Fab color="primary" className={classes.fab} onClick={(e) => handleArticle(e)}>
                    <SaveIcon/>
                </Fab>

            </form>
        </>
    );
}

export default AddArticle;