import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import { getProfileFetch } from "./actions";
import LandlordDashboard from "./Components/Landlord/Dashboard";
import LandlordAppTable from "./Components/Landlord/AppTable";
import TenantDashboard from "./Components/Tenant/Dashboard";
import TenantAppTable from "./Components/Tenant/AppTable";
import TenantLease from "./Components/Tenant/Lease";
import HomeSpec from "./Components/Landlord/HomeSpec";

import HomeForm from "./Components/HomeForm";
import { Switch, Route, withRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFetch());
  }, [dispatch]);

  return (
    <div className="Main">
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Signin} />
          <Route path="/tenant-home" component={TenantDashboard} />
          <Route path="/landlord-home" component={LandlordDashboard} />
          <Route path="/landlord-applications" component={LandlordAppTable} />
          <Route path="/tenant-applications" component={TenantAppTable} />
          <Route path="/my-lease" component={TenantLease} />
          <Route path="/add-a-home" component={HomeForm} />
          <Route path="/add-a-home" component={HomeForm} />
          <Route path="/my-properties/:id" component={HomeSpec} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
