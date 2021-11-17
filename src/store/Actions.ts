import { ICarouselItem, ICarouselName } from './interfaces';

interface ILoadCarouselAction {
    type: 'LOAD_CAROUSEL';
    payload: {
        carouselName: ICarouselName;
        data: ICarouselItem[];
    }
}

export const loadCarouselAction = (carouselName: ICarouselName, data: ICarouselItem[]): IAction => ({
    type: 'LOAD_CAROUSEL',
    payload: {
        carouselName,
        data
    }
});

interface ISelectCarouselItemAction {
    type: 'SELECT_CAROUSEL_ITEM';
    payload: {
        carouselName: ICarouselName;
        index: number;
    }
}

export const selectCarouselItemAction = (carouselName: ICarouselName, index: number): IAction => ({
    type: 'SELECT_CAROUSEL_ITEM',
    payload: {
        carouselName,
        index
    }
});

export type IAction = ILoadCarouselAction | ISelectCarouselItemAction;
