import { applyMiddleware, combineReducers, createStore } from 'redux';
import { dataReducer } from './dataReducer';
import { viewReducer } from './viewReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAction } from './Actions';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const store = createStore(combineReducers({
    data: dataReducer,
    view: viewReducer
}), applyMiddleware(thunk));

export type IState = ReturnType<typeof store.getState>;
export type IDispatch = ThunkDispatch<IState, void, IAction>;
export type IThunk = () => ThunkAction<void, IState, void, IAction>;
export const useAppDispatch: () => IDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
