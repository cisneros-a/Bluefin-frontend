import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import userReducer from "./userinfo";
import homeReducer from "./homes";
import toggleRedcuer from "./toggle";
import selectedTenantPropertyReducer from "./selectedTenantProperty";
import selectedLandlordPropertyReducer from "./selectedLandlordProperty";
import tenantApplicationReducer from "./tenantApplications";
import landlordApplicationReducer from "./landlordApplications";
import tenantLeaseReducer from "./tenantLease";
import landlordPropertiesReducer from "./landlordProperties";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  user: userReducer,
  homes: homeReducer,
  selectedTenantHome: selectedTenantPropertyReducer,
  selectedLandlordProperty: selectedLandlordPropertyReducer,
  toggle: toggleRedcuer,
  tenantApplications: tenantApplicationReducer,
  landlordApplications: landlordApplicationReducer,
  tenantLease: tenantLeaseReducer,
  landlordProperties: landlordPropertiesReducer,
});

export default allReducers;
