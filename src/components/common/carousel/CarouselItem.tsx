import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { ICarouselItem } from '../../../store/interfaces';

export const horizontalMargin = 10;

const styles = () => createStyles({
    imgClass: {
        padding: horizontalMargin,
        objectFit: 'cover'
    }
});

interface ICarouselItemProps extends WithStyles<typeof styles> {
    item: ICarouselItem;
    'data-testid'?: string;
    width?: number;
    type?: 'rect' | 'circle';
    onClick?: () => void;
}

/**
 * One carousel item/image
 */
const CarouselItemPure = (props: ICarouselItemProps) => (
    <img
        src={props.item.imageUrl}
        className={props.classes.imgClass}
        data-testid={props['data-testid']}
        alt={props.item.alt}
        style={{
            // img styling is trying to keep aspect ratio
            minWidth: props.width,
            maxWidth: props.width,
            borderRadius: `${props.type === 'circle' ? 50 : 10}%`,
            minHeight: props.type === 'circle' ? props.width : undefined,
            maxHeight: props.type === 'circle' ? props.width : undefined
        }}
        onClick={props.onClick}
    />
);

export const CarouselItem = withStyles(styles)(CarouselItemPure);
