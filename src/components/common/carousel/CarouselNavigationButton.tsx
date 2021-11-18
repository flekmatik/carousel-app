import React from 'react';
import { createStyles, Fab, withStyles, WithStyles } from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';

const styles = () => createStyles({
    rootClass: {
        position: 'absolute',
        zIndex: 1000
    }
});

interface ICarouselNavigationButtonProps extends WithStyles<typeof styles> {
    style?: React.CSSProperties;
    'data-testid'?: string;
    onClick: () => void;
}

const CarouselNavigationButtonPure = (props: ICarouselNavigationButtonProps) => (
    <Fab
        style={props.style}
        color="primary"
        className={props.classes.rootClass}
        data-testid={props['data-testid']}
        tabIndex={-1}
        size="small"
        onClick={props.onClick}
    >
        <NavigateBefore />
    </Fab>
);

export const CarouselNavigationButton = withStyles(styles)(CarouselNavigationButtonPure);
