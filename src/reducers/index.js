import loggedReducer from './isLogged'
import {combineReducers} from 'redux'
import userReducer from './userinfo';

const allReducers = combineReducers({
    isLogged : loggedReducer,
    user: userReducer,
})

export default allReducers