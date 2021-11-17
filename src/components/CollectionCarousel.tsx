import * as React from 'react';
import { Carousel } from './common/carousel/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import collectionsNearbyJson from '../assets/collections-nearby.json';
import { ICarouselItem } from '../store/interfaces';
import { useAppDispatch, useAppSelector } from '../store';

export const CollectionCarousel = () => {
    const currentItemIndex = useAppSelector(state => state.view.collectionCarouselIndex);
    const dispatch = useAppDispatch();
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
            onSelectItem={index => dispatch({
                type: 'SELECT_CAROUSEL_ITEM',
                payload: {
                    carouselName: 'collection',
                    index
                }
            })}
        />
    )
}
