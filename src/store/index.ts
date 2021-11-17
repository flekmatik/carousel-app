import { combineReducers, createStore, Dispatch } from 'redux';
import { dataReducer } from './dataReducer';
import { viewReducer } from './viewReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAction } from './Actions';

export const store = createStore(combineReducers({
    data: dataReducer,
    view: viewReducer
}));

export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => Dispatch<IAction> = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
