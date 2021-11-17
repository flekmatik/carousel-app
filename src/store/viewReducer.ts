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
        default: return state;
    }
}
