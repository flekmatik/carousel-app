import { ICarouselItem } from './store/interfaces';
import storiesNearbyJson from './assets/stories-nearby.json';

type IStoryEntryApi = typeof storiesNearbyJson.data[0];

export const storyCarouselItemFromApi = (entry: IStoryEntryApi): ICarouselItem => ({
    imageUrl: entry.cover_src,
    alt: entry.title
});
