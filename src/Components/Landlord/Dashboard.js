import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchLandlordProperties } from "../../actions";
import CardHolder from "../CardHolder";
import { useSelector, useDispatch } from "react-redux";
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
          <Typography variant="h4" component="h3">
            <div className={"CardHolderName"}>Leased :</div>
          </Typography>
          <div className="leasedHomes">{showCards(leasedProperties)}</div>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h4" component="h3">
            <div className={"CardHolderName"}> Not Leased :</div>
          </Typography>
          {showCards(unleasedProperties)}
        </Grid>
      </Grid>
    </div>
  );
}
