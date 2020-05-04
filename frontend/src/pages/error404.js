import React from 'react';
import { useLocation } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Error404 = () => {

    let location = useLocation();

    return (
        <>
            <Paper elevation={2}>
                <Grid container justify="center" >
                    <Grid item >
                        Nenhum resultado para <strong>{location.pathname}</strong>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Error404;