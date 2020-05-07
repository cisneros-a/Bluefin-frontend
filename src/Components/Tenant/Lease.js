import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTenantLease } from "../../actions";
import Tnavbar from "./Navbar";
import FixesContainer from "../Landlord/FixesContainer";
import LeaseInformationBar from "../LeaseInformationBar";
import LeaseDropdown from "./LeaseDropdown";

export default function TenantLease() {
  const userId = parseInt(localStorage.userId);
  const tenantLease = useSelector((state) => state.tenantLease.state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTenantLease(userId));
  }, []);

  const displayStats = (lease) => {
    console.log(lease);
    if (tenantLease) {
      const date = lease.lease.created_at.split("-");

      return (
        <LeaseInformationBar
          address={lease.property.address}
          createdDate={date}
          userType="tenant"
          name={lease.landlord.name}
        />
      );
    }
  };

  if (tenantLease.lease !== "none") {
    return (
      <div className="lease">
        <div className="header">
          <Tnavbar />
        </div>

        <div className="leaseStat">{displayStats(tenantLease)}</div>
        <div className="lease-container">
          <h3>Lease tools: </h3>
          <h3>Your fix Requests: </h3>
          <LeaseDropdown tenantLease={tenantLease} />
          <FixesContainer userType={"Tenant"} />
        </div>
      </div>
    );
  }

  return (
    <div className="lease">
      <div className="header">
        <Tnavbar />
      </div>
      <h2> You do not have a lease yet!</h2>
    </div>
  );
}
