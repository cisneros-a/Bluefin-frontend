import React from "react";
import HomeCard from "./HomeCard";
import LandlordHomeCard from "./LandlordHomeCard";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

export default function CardHolder({ properties }) {
  const userType = useSelector((state) => state.user.userType);

  let populateCards = () => {
    if (userType === "tenant") {
      return properties.state.map((home) => (
        <Grid className="CardGrid" item xs={4}>
          <HomeCard key={home.id} img={home.uploads} home={home.property} />{" "}
        </Grid>
      ));
    } else {
      console.log("being hit");

      return properties.map((property) => (
        <Grid className="CardGrid" item xs={5}>
          <LandlordHomeCard
            key={property.uploads}
            img={property.uploads}
            propertyInfo={property.property}
          />
        </Grid>
      ));

      // return props.homes.map((home) => (
      // ));
    }
  };

  return (
    <div className="scroll">
      <Grid className="cardDiv" container spacing={1}>
        {populateCards()}
      </Grid>
    </div>
  );
}
