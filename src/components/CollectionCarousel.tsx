import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import collectionsNearbyJson from '../assets/collections-nearby.json';
import { ICarouselItem } from '../store/interfaces';

export const CollectionCarousel = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [items, setItems] = useState<ICarouselItem[]>();

    useEffect(() => {
        axios.get('https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/collections-nearby')
            .then(result => {
                // TODO: there is a CORS issue and this request doesn't work from localhost,
                //  server configuration change is necessary
                setItems(
                    result.data.data.map((entry: any) => ({
                        imageUrl: entry.cover_image_url,
                        alt: entry.name
                    }))
                )
            })
            .catch(e => {
                console.log('Collections load failed, using cached data', e);
                setItems(
                    collectionsNearbyJson.data.map(entry => ({
                        imageUrl: entry.cover_image_url,
                        alt: entry.name
                    }))
                );
            });
    }, []);

    if (!items) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="rect"
            items={items}
            itemWidth={400}
            centered
            selectedIndex={currentItemIndex}
            onSelectItem={newIndex => setCurrentItemIndex(newIndex)}
        />
    )
}
