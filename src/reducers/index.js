import loggedReducer from './isLogged'
import {combineReducers} from 'redux'
import userReducer from './userInfo';
import homeReducer from './homes'
import toggleRedcuer from './toggle'
import selectedHomeReducer from './selectedHome'
import applicationReducer from './applications'
import tenantLeaseReducer from './tenantLease'

const allReducers = combineReducers({
    isLogged : loggedReducer,
    user: userReducer,
    homes: homeReducer,
    selectedHome: selectedHomeReducer,
    toggle: toggleRedcuer,
    applications: applicationReducer, 
    tenantLease: tenantLeaseReducer
})

export default allReducers