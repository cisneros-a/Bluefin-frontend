import loggedReducer from './isLogged'
import {combineReducers} from 'redux'
import userReducer from './userInfo';
import homeReducer from './homes'
import selectedHomeReducer from './selectedHome'

const allReducers = combineReducers({
    isLogged : loggedReducer,
    user: userReducer,
    homes: homeReducer,
    selectedHome: selectedHomeReducer
})

export default allReducers