import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../store';

export const StoryCarousel = () => {
    const items = useAppSelector(state => state.data.storyCarouselData);
    const currentItemIndex = useAppSelector(state => state.view.storyCarouselIndex);
    const dispatch = useAppDispatch();

    if (!items) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="circle"
            items={items}
            itemWidth={100}
            aria-label="Carousel of stories"
            selectedIndex={currentItemIndex}
            onSelectItem={index => dispatch({
                type: 'SELECT_CAROUSEL_ITEM',
                payload: {
                    carouselName: 'story',
                    index
                }
            })}
        />
    );
}
