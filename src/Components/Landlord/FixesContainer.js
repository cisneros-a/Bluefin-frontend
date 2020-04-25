import React, { useState } from "react";
import { useSelector } from "react-redux";
import LandlordFixCard from "./FixCard";
import TenantFixCard from "../Tenant/FixCard";

export default function FixesContainer({ userType }) {
  const fixes = useSelector((state) => state.fixes.state);
  console.log("fixes", fixes);

  const returnCards = () => {
    if (fixes.length > 0) {
      if (userType === "Landlord") {
        return fixes.map((fix) => {
          return <LandlordFixCard key={fix.fix.id} fix={fix} />;
        });
      } else {
        return fixes.map((fix) => {
          return <TenantFixCard key={fix.fix.id} fix={fix} />;
        });
      }
    }
    return <h3> No fix requests for this propertry!</h3>;
  };

  return (
    <>
      <div className="spec">{fixes ? returnCards() : null}</div>
    </>
  );
}
