import React, { useState } from "react";
import history from "../history";
import { DirectUpload } from "activestorage";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { addLandlordProperty, addPropertyToAllProperties } from "../actions";
import Lnavbar from "./Landlord/Navbar";

export default function TestHomeForm() {
  const allProperties = useSelector((state) => state.homes);

  const landlordProperties = useSelector(
    (state) => state.landlordProperties.state
  );
  const userId = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const [images, setImages] = useState("");
  const [values, setValues] = useState({
    address: "",
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

  const changeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
    console.log(acceptedFiles);
  };

  //   const error = false;

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
    return states.map((state) => <option value={state}>{state}</option>);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let input = `${values.address}, ${values.city}, ${values.state}, ${values.zipcode}`;
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

    // console.log(property);
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
            .then(
              (result) =>
                dispatch(addLandlordProperty(landlordProperties, result)) &&
                dispatch(addPropertyToAllProperties(allProperties, result))
            )
            .then(history.push("/landlord-home"));
        }
        console.log("pls workk");
      });
    });
  };

  return (
    <div className="home-form-container">
      <div className="header">
        <Lnavbar />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="home-form">
        <h2> Upload A Home</h2>
        <div className="one-input">
          <div className="home-form-field">
            <label className="form-label"> Address </label>
            <input
              onChange={(e) => changeValues(e)}
              type="text"
              name="address"
              value={values.address}
            ></input>
          </div>
        </div>
        {/* ===================================== */}
        <div className="three-inputs">
          <div className="home-form-field">
            <label className="home-form-label"> City </label>
            <input
              onChange={(e) => changeValues(e)}
              type="text"
              name="city"
              value={values.city}
            ></input>
          </div>
          <div className="home-form-field">
            <label className="home-form-label"> State </label>
            <select
              id="state"
              value={values.state}
              onChange={(e) => changeValues(e)}
            >
              {createOptions()}
            </select>
          </div>
          <div className="home-form-field">
            <label className="home-form-label"> Zip Code </label>
            <input
              onChange={(e) => changeValues(e)}
              type="number"
              name="zipcode"
              value={values.zipcode}
            ></input>
          </div>
        </div>
        {/* ===================================== */}
        <div className="three-inputs">
          <div className="home-form-field">
            <label className="home-form-label"> Rent </label>
            <input
              onChange={(e) => changeValues(e)}
              type="number"
              name="rent"
              value={values.rent}
            ></input>
          </div>
          <div className="home-form-field">
            <label className="home-form-label"> Bedrooms </label>
            <input
              onChange={(e) => changeValues(e)}
              type="number"
              name="bedrooms"
              value={values.bedrooms}
            ></input>
          </div>
          <div className="home-form-field">
            <label className="home-form-label"> Bathrooms </label>
            <input
              onChange={(e) => changeValues(e)}
              type="number"
              name="bathrooms"
              value={values.bathrooms}
            ></input>
          </div>
        </div>
        {/* ===================================== */}
        <div className="two-inputs">
          <div className="home-form-field">
            <label className="home-form-label"> Square Footage </label>
            <input
              onChange={(e) => changeValues(e)}
              type="number"
              name="sqft"
              value={values.sqft}
            ></input>
          </div>
          <div className="home-form-field">
            <label className="home-form-label"> Available Date </label>
            <input
              onChange={(e) => changeValues(e)}
              type="date"
              name="date"
              value={values.date}
            ></input>
          </div>
        </div>
        <div className="one-input">
          <div className="home-form-field">
            <label className="form-label"> Description </label>
            <input
              onChange={(e) => changeValues(e)}
              type="text"
              name="description"
              value={values.description}
            ></input>
          </div>
        </div>
        <div className="one-input">
          <div className="home-form-field">
            <label className="home-form-label"> Photo </label>

            <Dropzone
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
              accept="image/png, image/gif,image/jpg,image/jpeg"
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="dropzone">
                      {images === ""
                        ? `Drag 'n' drop some files here, or click to select files`
                        : `${images[0].name}`}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
        <button className="home-form-btn" type="submit">
          {" "}
          Upload
        </button>
      </form>
    </div>
  );
}
