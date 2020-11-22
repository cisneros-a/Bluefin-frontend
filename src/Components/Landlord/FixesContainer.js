import React from "react";
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
    return <h3> </h3>;
  };

  return (
    <>
      <div className="spec">{fixes.length > 0 ? returnCards() : <h3></h3>}</div>
    </>
  );
}
