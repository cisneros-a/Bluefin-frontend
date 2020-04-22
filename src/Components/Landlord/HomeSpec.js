import React from "react";
import { useEffect } from "react";
import Lnavbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchLandlordLease } from "../../actions";
import LeaseInformationBar from "../LeaseInformationBar";
import SpecsContainer from "./SpecsContainer";

export default function LandlordHomeSpec() {
  const dispatch = useDispatch();
  const leaseObj = useSelector((state) => state.selectedLandlordProperty);
  useEffect(() => {
    dispatch(fetchLandlordLease(leaseObj.state.id));
  }, []);

  const displayStats = () => {
    if (leaseObj.state.tenant) {
      let lease = leaseObj.state;
      return (
        <LeaseInformationBar
          address={lease.property.address}
          createdDate={lease.lease.created_at.split("-")}
          userType="landlord"
          name={lease.tenant.name}
        />
      );
    }
  };

  return (
    <div>
      <div className="header">
        <Lnavbar />
      </div>
      <div className="leaseStat">{displayStats()}</div>

      <SpecsContainer />
    </div>
  );
}
