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
    width?: number;
    type?: 'rect' | 'circle';
    onClick?: () => void;
}

/**
 * One carousel item/image
 */
class CarouselItemPure extends React.PureComponent<ICarouselItemProps> {
    render() {
        const item = this.props.item;
        return (
            <div>
                <img
                    src={item.imageUrl}
                    className={this.props.classes.imgClass}
                    alt={item.alt}
                    style={{
                        width: this.props.width,
                        borderRadius: `${this.props.type === 'circle' ? 50 : 10}%`,
                        height: this.props.type === 'circle' ? this.props.width : undefined
                    }}
                    onClick={this.props.onClick}
                />
            </div>
        );
    }
}

export const CarouselItem = withStyles(styles)(CarouselItemPure);
