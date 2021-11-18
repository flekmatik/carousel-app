import React from 'react';
import { createStyles, Fab, withStyles, WithStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const styles = () => createStyles({
    rootClass: {
        position: 'absolute',
        zIndex: 1000
    }
});

interface ICarouselNavigationButtonProps extends WithStyles<typeof styles> {
    type: 'prev' | 'next';
    style?: React.CSSProperties;
    'data-testid'?: string;
    onClick: () => void;
}

const CarouselNavigationButtonPure = (props: ICarouselNavigationButtonProps) => (
    <Fab
        style={props.style}
        color="primary"
        className={props.classes.rootClass}
        data-testid={`carousel-${props.type}-button`}
        tabIndex={-1}
        size="small"
        onClick={props.onClick}
    >
        {props.type === 'next' ? <NavigateBefore /> : <NavigateNext />}
    </Fab>
);

export const CarouselNavigationButton = withStyles(styles)(CarouselNavigationButtonPure);
