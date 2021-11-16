import * as React from 'react';
import { style } from 'typestyle';

export const horizontalMargin = 10;

const imgStyle = style({
    padding: horizontalMargin,
    objectFit: 'cover'
});

export interface ICarouselItem {
    title?: string;
    imageUrl: string;
    alt?: string;
}

interface ICarouselItemProps {
    item: ICarouselItem;
    width?: number;
    type?: 'rect' | 'circle';
    onClick?: () => void;
}

/**
 * One carousel item/image
 */
export class CarouselItem extends React.PureComponent<ICarouselItemProps> {
    render() {
        const item = this.props.item;
        return (
            <div>
                <img
                    src={item.imageUrl}
                    className={imgStyle}
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
