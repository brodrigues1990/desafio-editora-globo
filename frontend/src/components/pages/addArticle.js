import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom'

const AddArticle = (props) => {

    let history = useHistory();
    const ArticleId = props.match.params.id;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const data = {
        title,
        content
    }
    
    async function handleArticle(e) {
        e.preventDefault();
        
        if(ArticleId !== undefined){
            // Editar Noticia
            try {
                await api.put(`articles/${ArticleId}`, data);
                history.goBack();
            } catch (err) {
                alert("erro na edicao");
            }
        }else{
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



    return (
        <>
            <span>
                NOVA NOTICIA
            </span>
            <form onSubmit={handleArticle}>
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
                <button type="submit">Salvar</button>
            </form>
        </>
    );
}

export default AddArticle;