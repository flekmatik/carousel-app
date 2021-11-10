import * as React from 'react';
import { Carousel } from './common/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ICarouselPage } from './common/CarouselPage';
import axios from 'axios';
import collectionsNearbyJson from '../assets/collections-nearby.json';

export const CollectionCarousel = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [pages, setPages] = useState<ICarouselPage[]>();

    useEffect(() => {
        axios.get('https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/collections-nearby')
            .then(result => {
                // TODO: there is a CORS issue and this request doesn't work from localhost,
                //  server configuration change is necessary
                setPages(
                    result.data.data.map((entry: any) => ({
                        imageUrl: entry.cover_image_url,
                        alt: entry.name
                    }))
                )
            })
            .catch(e => {
                console.log('Collections load failed, using cached data', e);
                setPages(
                    collectionsNearbyJson.data.map(entry => ({
                        imageUrl: entry.cover_image_url,
                        alt: entry.name
                    }))
                );
            });
    }, []);

    if (!pages) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="rect"
            pages={pages}
            pageIndex={currentPageIndex}
            onChangePage={newPage => setCurrentPageIndex(newPage)}
        />
    )
}
