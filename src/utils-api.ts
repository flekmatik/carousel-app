import axios from 'axios';
import { ICarouselItem } from './store/interfaces';
import storiesNearbyJson from './assets/stories-nearby.json';
import collectionsNearbyJson from './assets/collections-nearby.json';

axios.defaults.baseURL = 'https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/';

type ICollectionEntryApi = typeof collectionsNearbyJson.data[0];
const collectionCarouselItemFromApi = (entry: ICollectionEntryApi): ICarouselItem => ({
    imageUrl: entry.cover_image_url,
    alt: entry.name
});

export const fetchCollectionCarouselData = async () => {
    try {
        const result = await axios.get<typeof collectionsNearbyJson>('/collections-nearby');
        // TODO: there is a CORS issue and this request doesn't work from localhost,
        //  server configuration change is necessary
        return result.data.data.map(collectionCarouselItemFromApi);
    } catch (e) {
        console.log('Collections load failed, using cached data', e);
        return collectionsNearbyJson.data.map(collectionCarouselItemFromApi);
    }
}

type IStoryEntryApi = typeof storiesNearbyJson.data[0];
const storyCarouselItemFromApi = (entry: IStoryEntryApi): ICarouselItem => ({
    imageUrl: entry.cover_src,
    alt: entry.title
});

export const fetchStoriesCarouselData = async () => {
    try {
        const result = await axios.get<typeof storiesNearbyJson>('/stories-nearby');
        // TODO: there is a CORS issue and this request doesn't work from localhost,
        //  server configuration change is necessary
        return result.data.data.map(storyCarouselItemFromApi);
    } catch (e) {
        console.log('Stories load failed, using cached data', e);
        return storiesNearbyJson.data.map(storyCarouselItemFromApi);
    }
}
