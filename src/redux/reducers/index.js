import { combineReducers } from 'redux';
import { userReducer } from './userReducer'
import { poductsreducer } from './productsReducer'

export const rootReducers = combineReducers({
    userReducer,
    poductsreducer
})