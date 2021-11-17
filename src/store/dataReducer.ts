import { IAction } from './Actions';
import { ICarouselItem } from './interfaces';

interface IDataState {
    storyCarouselData?: ICarouselItem[];
    collectionCarouselData?: ICarouselItem[];
}

const initialState: IDataState = {};

export const dataReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'LOAD_CAROUSEL':
            switch (action.payload.carouselName) {
                case 'story':
                    return {
                        ...state,
                        storyCarouselData: action.payload.data
                    }
                case 'collection':
                    return {
                        ...state,
                        collectionCarouselData: action.payload.data
                    }
                default:
                    return state;
            }
        default:
            return state;
    }
}
