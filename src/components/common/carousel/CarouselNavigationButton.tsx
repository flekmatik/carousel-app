import React from 'react';
import { Fab } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

interface ICarouselNavigationButtonProps {
    type: 'prev' | 'next';
    'data-testid'?: string;
    onClick: () => void;
}

export const CarouselNavigationButton = (props: ICarouselNavigationButtonProps) => (
    <Fab
        style={{
            zIndex: 1000
        }}
        color="primary"
        data-testid={`carousel-${props.type}-button`}
        tabIndex={-1}
        size="small"
        onClick={props.onClick}
    >
        {props.type === 'prev' ? <NavigateBefore /> : <NavigateNext />}
    </Fab>
);
