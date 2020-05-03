import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

const Home = (props) => {

    let history = useHistory();
    const [articles, setArticle] = useState([]);

    // Carrega todas as noticias
    const loadAllArticles = async () => {
        await api.get("articles")
            .then(res => {
                setArticle(res.data);
            })
    }

    // Envia para pagina de edicao
    const handleEditArticle = (id) => {
        history.push({
            pathname: `/edit-article/${id}`,
        });
    }

    // Deleta noticia selecionada
    const handleDeleteArticle = async (id) => {
        try {
            await api.delete(`articles/${id}`);
            setArticle(articles.filter(article => article.id !== id));
        } catch (err) {
            alert('Erro ao deletar')
        }
    }

    useEffect(() => {
        loadAllArticles();
    }, [articles]);

    
    const classes = useStyles();
    return (
        <>
            <ul>
                {
                    articles.map((article, i) => (
                        <li key={i} className="card">
                            <strong>Titulo:</strong>
                            <div className="card-content">{article.title}</div>
                            <div className="card-content">{article.content}</div>
                            <div className="card-content">{article.createdAt}</div>
                            <div className="card-content">{article.id}</div>
                            <button onClick={() => handleEditArticle(article.id)} type="button">
                                {`editar ${article.id}`}
                            </button>
                            <button onClick={() => handleDeleteArticle(article.id)} type="button">
                                {`deletar ${article.id}`}
                            </button>
                        </li>
                    ))
                }
            </ul>

            <Link to="/add-article">
                <Fab color="primary" aria-label="Adicionar Noticia" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}

export default Home;