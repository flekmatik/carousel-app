import * as React from 'react';
import { Carousel } from './common/Carousel';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ICarouselPage } from './common/CarouselPage';
import axios from 'axios';
import storiesNearbyJson from '../assets/stories-nearby.json';

export const StoryCarousel = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [pages, setPages] = useState<ICarouselPage[]>();

    useEffect(() => {
        axios.get('https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/stories-nearby')
            .then(result => {
                // TODO: there is a CORS issue and this request doesn't work from localhost,
                //  server configuration change is necessary
                setPages(
                    result.data.data.map((entry: any) => ({
                        imageUrl: entry.cover_src,
                        alt: entry.title
                    }))
                )
            })
            .catch(e => {
                console.log('Stories load failed, using cached data', e);
                setPages(
                    storiesNearbyJson.data.map(entry => ({
                        imageUrl: entry.cover_src,
                        alt: entry.title
                    }))
                );
            });
    }, []);

    if (!pages) {
        return <CircularProgress />;
    }
    return (
        <Carousel
            type="circle"
            pages={pages}
            pageIndex={currentPageIndex}
            onChangePage={newPage => setCurrentPageIndex(newPage)}
        />
    )
}
