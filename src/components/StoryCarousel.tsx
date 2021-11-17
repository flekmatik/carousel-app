import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ICarouselItem } from '../store/interfaces';
import axios from 'axios';
import storiesNearbyJson from '../assets/stories-nearby.json';
import { useAppDispatch, useAppSelector } from '../store';

export const StoryCarousel = () => {
    const currentItemIndex = useAppSelector(state => state.view.storyCarouselIndex);
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<ICarouselItem[]>();

    useEffect(() => {
        axios.get('https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/stories-nearby')
            .then(result => {
                // TODO: there is a CORS issue and this request doesn't work from localhost,
                //  server configuration change is necessary
                setItems(
                    result.data.data.map((entry: any) => ({
                        imageUrl: entry.cover_src,
                        alt: entry.title
                    }))
                )
            })
            .catch(e => {
                console.log('Stories load failed, using cached data', e);
                setItems(
                    storiesNearbyJson.data.map(entry => ({
                        imageUrl: entry.cover_src,
                        alt: entry.title
                    }))
                );
            });
    }, []);

    if (!items) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="circle"
            items={items}
            itemWidth={100}
            selectedIndex={currentItemIndex}
            onSelectItem={index => dispatch({
                type: 'SELECT_CAROUSEL_ITEM',
                payload: {
                    carouselName: 'story',
                    index
                }
            })}
        />
    )
}
