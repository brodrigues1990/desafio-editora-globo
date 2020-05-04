import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Logo from '../assets/LogoInfoGlobo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 30
    },
    image: {
        height: 30,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Grid container justify="center" >
                        <Grid item >
                            <img src={Logo} alt="Editora Globo" className={classes.image} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;