import React from 'react';
import { useLocation,useHistory, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ErrorImage from '../assets/robotError404.png'
import { makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    textGrid: {
        width: '100%',
        margin: theme.spacing(2, 2),
    },
}));

const Error404 = () => {

    const location = useLocation();
    let history = useHistory();
    const classes = useStyles();

    return (
        <>
            <Paper elevation={2}>
                <Grid container>
                    <Grid container item className={classes.textGrid} justify="flex-end">
                        <Link onClick={e => history.goBack()}>
                            <CloseIcon color="action" style={{ fontSize: 30 }} />
                        </Link>
                    </Grid>
                    <Grid container justify="center" >
                        <Grid item xs={6}>
                            <img src={ErrorImage} />
                        </Grid>
                        <Grid container direction="column" xs={6}>
                            <Grid item >
                                Erro 404
                        </Grid>
                            <Grid item >
                                Nenhum resultado para <strong>{location.pathname}</strong>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Error404;