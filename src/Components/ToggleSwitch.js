import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(5, 0)
  },
  button: {
    background: "linear-gradient(#e66465, #9198e5) 50%;",
    borderRadius: 3
  }
}));

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            className={classes.button}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton onClick={() => props.handleToggle("Map")} value="left" aria-label="left aligned">
              <MapIcon />
            </ToggleButton>
            <ToggleButton onClick={() => props.handleToggle('Card')} value="center" aria-label="centered">
              <ListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
}

// 