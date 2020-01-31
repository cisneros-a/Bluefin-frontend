import loggedReducer from './isLogged'
import {combineReducers} from 'redux'
import userReducer from './userinfo';
import homeReducer from './homes'

const allReducers = combineReducers({
    isLogged : loggedReducer,
    user: userReducer,
    homes: homeReducer
})

export default allReducers