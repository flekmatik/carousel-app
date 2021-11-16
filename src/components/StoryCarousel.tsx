import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ICarouselItem } from './common/carousel/CarouselItem';
import axios from 'axios';
import storiesNearbyJson from '../assets/stories-nearby.json';

export const StoryCarousel = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
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
            onSelectItem={newPage => setCurrentItemIndex(newPage)}
        />
    )
}
