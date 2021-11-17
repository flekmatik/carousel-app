import { combineReducers, createStore } from 'redux';
import { dataReducer } from './dataReducer';
import { viewReducer } from './viewReducer';

export const store = createStore(combineReducers({
    data: dataReducer,
    view: viewReducer
}));
