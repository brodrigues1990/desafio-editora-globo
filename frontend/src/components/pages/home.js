import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';

const Home = (props) => {

    let history = useHistory();

    const [articles, setArticle] = useState([]);

    const loadAllArticles = async () => {
        await api.get("articles")
            .then(res => {
                setArticle(res.data);
            })
    }

    const handleEditArticle = (id) => {
        history.push({
            pathname: `/edit-article/${id}`,
        });
    }

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

    return (
        <>
            <Link className="button-globo" to="/add-article">
                Nova Noticia
            </Link>
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
        </>
    );
}

export default Home;