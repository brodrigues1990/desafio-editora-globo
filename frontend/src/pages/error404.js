import React from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

const Error404 = () => {

    let location = useLocation();

    return (
        <>
            <Paper elevation={2}>
                <span>
                    Nenhum resultado para <code>{location.pathname}</code>
                </span>
            </Paper>
        </>
    );
}

export default Error404;