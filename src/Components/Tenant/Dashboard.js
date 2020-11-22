import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@chakra-ui/core";
import Tnavbar from "./Navbar";
import { fetchAvailablehomes, toggleView } from "../../actions";
import CardHolder from "../CardHolder";
import HomeSpec from "./HomeSpecs";
import Map from "../Map";

export default function TenantDashboard() {
  const allHomes = useSelector((state) => state.homes);
  const selectedHome = useSelector((state) => state.selectedTenantHome);
  const dispatch = useDispatch();
  const toggleState = useSelector((state) => state.toggle);

  if (allHomes.state.length === 0) {
    dispatch(fetchAvailablehomes());
  }

  const showMap = (homes) => {
    if (homes.state) {
      if (homes.state.length > 0) {
        let onlyHomes = [];
        homes.state.forEach((home) => onlyHomes.push(home.property));
        if (toggleState) {
          return <CardHolder properties={homes.state} />;
        }
        return <Map homes={homes.state} />;
      }
    }
  };

  const showHomeSpecs = () => {
    if (selectedHome) {
      return <HomeSpec />;
    }
  };

  return (
    <div className="header">
      <Tnavbar />
      <div />
      <div className="toggle">
        <h3>Map</h3>
        <Switch
          onChange={() => dispatch(toggleView())}
          color="teal"
          size="lg"
        />
        <h3>Cards</h3>
      </div>
      <div className="tenant-dashboard-container">
        <div>{showMap(allHomes)}</div>

        <div>{showHomeSpecs()}</div>
      </div>
    </div>
  );
}
