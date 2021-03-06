import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/core";
import history from "../history";

import { Link } from "react-router-dom";
import StaticNavbar from "./StaticNavbar";

export default function TestLogin() {
  const [values, setValues] = useState({
    password: "",
    email: "",
    name: "",
    userType: "tenant",
  });

  const changeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const error = false;

  return (
    <div className="signin-container">
      <div className="staticHeader">
        <StaticNavbar />
      </div>
      <div className="signin-form">
        <h3> Sign up</h3>
        <form className="signup-form">
          <div className="form-field">
            <label className="form-label"> Name: </label>
            <input
              onChange={(e) => changeValues(e)}
              placeholder="name"
              type="text"
              name="name"
              value={values.name}
            ></input>
          </div>
          <div className={error ? "form-field-error" : "form-field"}>
            <label className="form-label"> Email: </label>
            <input
              onChange={(e) => changeValues(e)}
              placeholder="email"
              type="text"
              name="email"
              value={values.email}
            ></input>
            {error ? (
              <span class="error-message">A sample error message</span>
            ) : (
              ""
            )}
          </div>
          <div className={error ? "form-field-error" : "form-field"}>
            <label className="form-label"> Password: </label>
            <input
              onChange={(e) => changeValues(e)}
              placeholder="password"
              type="password"
              name="password"
              value={values.password}
            ></input>
            {error ? (
              <span class="error-message">Incorrect password.</span>
            ) : (
              ""
            )}
          </div>

          <button className="form-btn" type="submit">
            {" "}
            Sign up
          </button>
        </form>
        <Link to="/">{"Already have an account? Log in!"}</Link>
      </div>
    </div>
  );
}
