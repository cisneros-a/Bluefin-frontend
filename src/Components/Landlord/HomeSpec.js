import React from "react";
import { useEffect } from "react";
import Lnavbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchLandlordLease } from "../../actions";
import LeaseInformationBar from "../LeaseInformationBar";

export default function LandlordHomeSpec() {
  const dispatch = useDispatch();
  const leaseObj = useSelector((state) => state.selectedLandlordProperty);
  console.log("HomeSpec", leaseObj);
  useEffect(() => {
    dispatch(fetchLandlordLease(leaseObj.state.id));
  }, []);

  const displayStats = () => {
    if (leaseObj.state.tenant) {
      let lease = leaseObj.state;
      console.log(lease);
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

      {/* {console.log(property)} */}
      <p>HomeSpec</p>
    </div>
  );
}
