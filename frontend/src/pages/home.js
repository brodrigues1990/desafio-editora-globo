import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon  from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import api from '../services/api';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        background: grey[100]
    }
}));

const Home = (props) => {

    let history = useHistory();
    const [articles, setArticle] = useState([]);

    // Carrega todas as noticias
    const loadAllArticles = async () => {
        await api.get("articles")
            .then(res => {
                setArticle(res.data);
                console.log(res.data);
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
    }, []);


    const classes = useStyles();

    return (
        <>
            {/* <ul>
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
            </ul> */}

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
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
                                <TableCell align="left">{article.createdAt}</TableCell>
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
                <Fab color="primary"  fixed aria-label="Adicionar Noticia" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}

export default Home;