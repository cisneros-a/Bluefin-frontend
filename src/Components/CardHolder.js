import React from "react";
import TenantHomeCard from "./Tenant/HomeCard";
import LandlordHomeCard from "./Landlord/HomeCard";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

export default function CardHolder({ properties }) {
  const userType = useSelector((state) => state.user.userType);

  let populateCards = () => {
    if (userType === "tenant") {
      return properties.map((home) => (
        <div>
          <TenantHomeCard
            key={home.id}
            img={home.uploads}
            home={home.property}
          />
        </div>
      ));
    } else {
      return properties.map((property) => (
        <div>
          <LandlordHomeCard
            key={property.property.id}
            img={property.uploads}
            propertyInfo={property.property}
          />
        </div>
      ));
    }
  };

  return <div className="scroll">{populateCards()}</div>;
}
