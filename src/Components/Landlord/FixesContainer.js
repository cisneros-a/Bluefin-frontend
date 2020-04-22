import React, { useState } from "react";
import { useSelector } from "react-redux";
import FixCard from "./FixCard";

export default function FixesContainer() {
  const fixes = useSelector((state) => state.fixes.state);

  const returnCards = () => {
    if (fixes.length > 0) {
      return fixes.map((fix) => {
        return <FixCard key={fix.fix.id} fix={fix} />;
      });
    }
    return <h3> No fix requests for this propertry!</h3>;
  };
  return (
    <>
      <div className="spec">{fixes ? returnCards() : null}</div>
    </>
  );
}
