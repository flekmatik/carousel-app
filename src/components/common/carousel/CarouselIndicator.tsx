import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    rootClass: {
        height: 5,
        borderRadius: '20%',
        backgroundColor: theme.palette.primary.main
    }
}));

export const CarouselIndicator = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootClass} />
    );
}
