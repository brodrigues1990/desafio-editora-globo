import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import api from '../services/api';
import { format } from 'date-fns'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableRow: {
        background: grey[100]
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const Home = (props) => {
    
    const classes = useStyles();
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
            ToastsStore.warning("Usuario deletado!");
        } catch (err) {
            ToastsStore.error("erro ao deletar");
        }
    }

    useEffect(() => {
        loadAllArticles();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell align="left">Título</TableCell>
                            <TableCell align="left">Conteudo</TableCell>
                            <TableCell align="left">Data Criação</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell component="th" scope="row">{article.title}</TableCell>
                                <TableCell align="left">{article.content}</TableCell>
                                <TableCell align="left">{format(new Date(article.createdAt), 'dd/MM/yyyy')}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component="span" onClick={() => handleEditArticle(article.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" component="span" onClick={() => handleDeleteArticle(article.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/add-article">
                <Fab color="primary" aria-label="Adicionar Noticia" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} lightBackground />
        </>
    );
}

export default Home;