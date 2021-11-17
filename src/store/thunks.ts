import { IThunk } from './index';
import { fetchCollectionCarouselData, fetchStoriesCarouselData } from '../utils-api';

export const loadInitDataThunk: IThunk = () => {
    return dispatch => {
        fetchCollectionCarouselData().then(items => dispatch({
            type: 'LOAD_CAROUSEL',
            payload: {
                carouselName: 'collection',
                data: items
            }
        }));
        fetchStoriesCarouselData().then(items => dispatch({
            type: 'LOAD_CAROUSEL',
            payload: {
                carouselName: 'story',
                data: items
            }
        }));
    }
}
