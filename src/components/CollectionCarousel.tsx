import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../store';

export const CollectionCarousel = () => {
    const currentItemIndex = useAppSelector(state => state.view.collectionCarouselIndex);
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.data.collectionCarouselData);

    if (!items) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="rect"
            items={items}
            itemWidth={400}
            centered
            aria-label="Carousel of collections"
            selectedIndex={currentItemIndex}
            onSelectItem={index => dispatch({
                type: 'SELECT_CAROUSEL_ITEM',
                payload: {
                    carouselName: 'collection',
                    index
                }
            })}
        />
    );
}
