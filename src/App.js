import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import TestNavbar from "./Components/Tenant/TestNavbar";
import { getProfileFetch } from "./actions";
import LandlordDashboard from "./Components/Landlord/Dashboard";
import LandlordNavbar from "./Components/Landlord/Lnavbar";
import LandlordAppTable from "./Components/Landlord/AppTable";
import TenantDashboard from "./Components/Tenant/Dashboard";
import TenantAppTable from "./Components/Tenant/AppTable";
import TenantLease from "./Components/Tenant/Lease";
import TenantNavbar from "./Components/Tenant/OldNavbar";
import GlobalStyle from "./Components/Global";
import HomeForm from "./Components/HomeForm";
import { Switch, Route, withRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const userType = useSelector((state) => state.user.userType);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfileFetch());
  }, [dispatch]);

  // const decideUserPath = () => {
  //   if (isLogged){
  //     if (userType === 'tenant'){
  //       return(
  //       <div>
  //           <TestNavbar/>
  //           <br></br>
  //           <br></br>

  //           <TenantDashboard/>
  //       </div> )
  //     } else {
  //       return <div><TestNavbar/>
  //       <LandlordNavbar/>
  //       <LandlordDashboard/>
  //       </div>
  //     }
  //   } return <> <Signin/> <Signup/> </>
  // }

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
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
