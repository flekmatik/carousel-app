import React, { useEffect } from 'react';
import './App.css';
import { CollectionCarousel } from './components/CollectionCarousel';
import { StoryCarousel } from './components/StoryCarousel';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useAppDispatch } from './store';
import { loadInitDataThunk } from './store/thunks';

const useStyles = makeStyles((theme: Theme) => createStyles({
    "@keyframes gradientAnimation": {
        '0%': {
            backgroundPosition: `0% 50%`
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        }
    },
    rootClass: {
        height: '100%',
        padding: '40px 10%',
        background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        backgroundSize: '400% 400%',
        overflow: 'scroll',
        animation: `$gradientAnimation 10s ease infinite`
    },
    titleClass: {
        marginBottom: 20,
        textAlign: 'center'
    }
}));

export const App = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadInitDataThunk());
    }, []);

    return (
        <div className={classes.rootClass}>
            <Typography
                variant="h2"
                className={classes.titleClass}
            >
                Carousel Demo
            </Typography>
            <CollectionCarousel />
            <div style={{ height: 30 }} />
            <StoryCarousel />
        </div>
    );
}
