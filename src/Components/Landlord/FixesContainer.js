import React from "react";
import { useSelector } from "react-redux";
import FixCard from "./FixCard";

export default function FixesContainer() {
  const fixes = useSelector(
    (state) => state.selectedLandlordProperty.state.fixes
  );

  const returnCards = () => {
    if (fixes.length > 0) {
      return fixes.map((fix) => {
        return <FixCard fix={fix} />;
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
