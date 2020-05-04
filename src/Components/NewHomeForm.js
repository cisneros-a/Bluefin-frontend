import React, { useState, useEffect } from "react";
import history from "../history";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { getProfileFetch, userSigninFetch } from "../actions";
import Lnavbar from "./Landlord/Navbar";

export default function TestHomeForm() {
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

  const changeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  let handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
    console.log(acceptedFiles);
  };

  const error = false;

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

  return (
    <div className="home-form-container">
      <div className="header">
        <Lnavbar />
      </div>
      <form className="home-form">
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
              value={values.zipcode}
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
