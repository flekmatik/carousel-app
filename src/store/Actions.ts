import { ICarouselItem, ICarouselName } from './interfaces';

interface ILoadCarouselAction {
    type: 'LOAD_CAROUSEL';
    payload: {
        carouselName: ICarouselName;
        data: ICarouselItem[];
    }
}

interface ISelectCarouselItemAction {
    type: 'SELECT_CAROUSEL_ITEM';
    payload: {
        carouselName: ICarouselName;
        index: number;
    }
}

export type IAction = ILoadCarouselAction | ISelectCarouselItemAction;
