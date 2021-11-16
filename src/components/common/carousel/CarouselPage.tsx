import * as React from 'react';
import { style } from 'typestyle';

export const horizontalMargin = 10;

const imgStyle = style({
    padding: horizontalMargin,
    objectFit: 'cover'
});

export interface ICarouselPage {
    title?: string;
    imageUrl: string;
    alt?: string;
}

interface ICarouselItemProps {
    page: ICarouselPage;
    width?: number;
    type?: 'rect' | 'circle';
    onClick?: () => void;
}

/**
 * Carousel Page equals to one carousel item/image
 */
export class CarouselPage extends React.PureComponent<ICarouselItemProps> {
    render() {
        const page = this.props.page;
        return (
            <div>
                <img
                    src={page.imageUrl}
                    className={imgStyle}
                    alt={page.alt}
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
