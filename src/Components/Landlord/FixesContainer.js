import React from "react";
import { useSelector } from "react-redux";
import FixCard from "./FixCard";

export default function FixesContainer() {
  const fixes = useSelector(
    (state) => state.selectedLandlordProperty.state.fixes
  );
  console.log(fixes);
  return (
    <>
      <div className="spec">
        {fixes
          ? fixes.map((fix) => {
              return <FixCard fix={fix} />;
            })
          : null}
      </div>
    </>
  );
}
