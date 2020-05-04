import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { addLandlordProperty } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { DirectUpload } from "activestorage";
import Dropzone from "react-dropzone";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import history from "../history";
import TestHomeForm from "./NewHomeForm";

// import InputAdornment from "@material-ui/core/InputAdornment";
import Lnavbar from "./Landlord/Navbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const landlordProperties = useSelector(
    (state) => state.landlordProperties.state
  );
  const userId = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();

  const [files, setFiles] = useState("");
  const classes = useStyles();
  const [images, setImages] = useState("");

  const [values, setValues] = useState({
    streetaddress: "",
    city: "",
    state: "TX",
    zipcode: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    date: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let input = `${values.streetaddress}, ${values.city}, ${values.state}, ${values.zipcode}`;
    console.log(values, images);
    let resp = await fetch(
      `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=OHYIZygaUlcGO559jEmBfMg_2UaFX5n3qMoYn7h2TKo&searchtext=${input}`
    );
    const data = await resp.json();
    console.log(
      data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
      data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    );

    let property = {
      user_id: userId,
      address: input,
      rent: values.rent,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
      sqft: values.sqft,
      availability: 1,
      available_date: values.date,
      description: values.description,
      latitude:
        data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
      longitude:
        data.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
      uploads: images[0],
    };
    const res = await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ property }),
    });

    const propertiesData = await res.json();
    if (data.message) {
      console.log("Maybe this failed");
    } else {
      uploadFile(images, propertiesData);
      // console.log(data)
    }
  };

  const uploadFile = (files, propertyId) => {
    console.log(propertyId);

    files.forEach((file) => {
      //   let property = {
      //       uploads: file
      //   }
      const upload = new DirectUpload(
        file,
        "http://localhost:3000/rails/active_storage/direct_uploads"
      );
      console.log(file);
      upload.create((error, blob) => {
        //   let property = { uploads : blob.signed_id
        //   }
        console.log("blob", blob);
        if (error) {
          console.log(error);
        } else {
          console.log("no error");
          fetch(`http://localhost:3000/properties/${propertyId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ uploads: blob.signed_id }),
          })
            .then((res) => res.json())
            .then((result) =>
              dispatch(addLandlordProperty(landlordProperties, result))
            )
            .then(history.push("/landlord-home"));
        }
        console.log("pls workk");
      });
    });
  };

  let handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
    console.log(acceptedFiles);
  };

  const createOptions = () => {
    // return <MenuItem value={'hello'}>State</MenuItem>
    let states = [
      "AL",
      "AK",
      "AS",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FM",
      "FL",
      "GA",
      "GU",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MH",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "MP",
      "OH",
      "OK",
      "OR",
      "PW",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VI",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    return states.map((state) => <MenuItem value={state}>{state}</MenuItem>);
  };
  //   const getRequest = () => {
  //     fetch('https://storage.googleapis.com/storage/v1/b/bluefin-app')
  //     .then(res=> res.json())
  //     .then(data => console.log(data))
  //   }

  //   getRequest()

  return (
    <div>
      <div className="header">
        <Lnavbar />
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload A Home
          </Typography>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange("streetaddress")}
                  autoComplete="streetadress"
                  name="street"
                  required
                  fullWidth
                  id="street"
                  label="Street Address"
                  autoFocus
                  color="secondary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  onChange={handleChange("city")}
                  autoComplete="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  color="secondary"
                />
              </Grid>

              <Grid item xs={4}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.state}
                  onChange={handleChange("state")}
                >
                  {createOptions()}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  onChange={handleChange("zipcode")}
                  autoComplete="zipcode"
                  required
                  fullWidth
                  type="number"
                  id="standard-adornment-amount"
                  label="Zip Code"
                  name="zipcode"
                  color="secondary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  onChange={handleChange("rent")}
                  autoComplete="rent"
                  required
                  fullWidth
                  type="number"
                  id="standard-adornment-amount"
                  label="Rent Amount"
                  name="rent"
                  color="secondary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  onChange={handleChange("bedrooms")}
                  autoComplete="beedrooms"
                  required
                  fullWidth
                  type="number"
                  id="standard-adornment-amount"
                  label="Bedrooms"
                  name="bedrooms"
                  color="secondary"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  onChange={handleChange("bathrooms")}
                  autoComplete="bathrooms"
                  required
                  fullWidth
                  type="number"
                  id="standard-adornment-amount"
                  label="Bathrooms"
                  name="bathrooms"
                  color="secondary"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  onChange={handleChange("sqft")}
                  color="secondary"
                  required
                  fullWidth
                  name="sqft"
                  label="Sqft"
                  type="number"
                  id="sqft"
                  autoComplete="sqft"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  onChange={handleChange("date")}
                  id="date"
                  label="Available Starting: "
                  type="date"
                  defaultValue="2020-02-14"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange("description")}
                  color="secondary"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                />
              </Grid>

              <Grid item xs={12}>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
                  accept="image/png, image/gif,image/jpg,image/jpeg"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Home!
            </Button>
          </form>
          {/* <TestHomeForm /> */}
        </div>
        <Box mt={5}></Box>
      </Container>
    </div>
  );
}
