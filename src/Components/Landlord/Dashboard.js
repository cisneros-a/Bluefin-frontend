import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchLandlordProperties } from "../../actions";
import CardHolder from "../CardHolder";
import Lnavbar from "./Navbar";

export default function LandlordDashboard() {
  const userId = parseInt(localStorage.userId);
  const dispatch = useDispatch();
  const leasedProperties = useSelector(
    (state) => state.landlordProperties.state.leased_properties
  );
  const unleasedProperties = useSelector(
    (state) => state.landlordProperties.state.unleased_properties
  );

  if (!leasedProperties && !unleasedProperties) {
    dispatch(fetchLandlordProperties(userId));
  }

  const showCards = (properties) => {
    if (properties) {
      return <CardHolder properties={properties} />;
    }
  };

  return (
    <div>
      <div className="header">
        <Lnavbar />
      </div>

      <Grid container spacing={2}>
        <Grid className="leftContainer" item xs={6}>
          <h1 className={"CardHolderName"}>Leased :</h1>
          <div className="leasedHomes">{showCards(leasedProperties)}</div>
        </Grid>

        <Grid item xs={6}>
          <h1 className={"CardHolderName"}> Not Leased :</h1>

          {showCards(unleasedProperties)}
        </Grid>
      </Grid>
    </div>
  );
}
