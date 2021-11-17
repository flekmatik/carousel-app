import { IAction } from './Actions';

interface IViewState {
    storyCarouselIndex: number;
    collectionCarouselIndex: number;
}

const initialState: IViewState = {
    storyCarouselIndex: 0,
    collectionCarouselIndex: 0
};

export const viewReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case 'SELECT_CAROUSEL_ITEM':
            switch (action.payload.carouselName) {
                case 'collection':
                    return {
                        ...state,
                        collectionCarouselIndex: action.payload.index
                    }
                case 'story':
                    return {
                        ...state,
                        storyCarouselIndex: action.payload.index
                    }
                default: return state;
            }
        default: return state;
    }
}
