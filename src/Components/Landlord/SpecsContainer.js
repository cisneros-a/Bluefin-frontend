import React from "react";
import FixesContainer from "./FixesContainer";
import PaymentsContainer from "./PaymentsContainer";

export default function SpecsContainer() {
  return (
    <div className="specs-container">
      <h1>Fix Requests: </h1>
      <h1>Payments: </h1>
      <FixesContainer userType={"Landlord"} />
      <PaymentsContainer />
    </div>
  );
}
