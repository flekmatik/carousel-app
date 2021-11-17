import { IThunk } from './index';
import axios from 'axios';
import storiesNearbyJson from '../assets/stories-nearby.json';
import { storyCarouselItemFromApi } from '../utils-api';

export const loadInitDataThunk: IThunk = () => {
    return dispatch => {
        axios.get('https://api.steller.co/v1/places/internal/4be25c23-8bfe-4915-90f9-b7427ac05bc9/stories-nearby')
            .then(result => {
                // TODO: there is a CORS issue and this request doesn't work from localhost,
                //  server configuration change is necessary
                dispatch({
                    type: 'LOAD_CAROUSEL',
                    payload: {
                        carouselName: 'story',
                        data: result.data.data.map(storyCarouselItemFromApi)
                    }
                });
            })
            .catch(e => {
                console.log('Stories load failed, using cached data', e);
                dispatch({
                    type: 'LOAD_CAROUSEL',
                    payload: {
                        carouselName: 'story',
                        data: storiesNearbyJson.data.map(storyCarouselItemFromApi)
                    }
                });
            });
    }
}
