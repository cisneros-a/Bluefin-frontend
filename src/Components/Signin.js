import React, { useState, useEffect } from "react";
import history from "../history";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileFetch, userSigninFetch } from "../actions";
import StaticNavbar from "./StaticNavbar";

export default function TestLogin() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    email: "",
    userType: "tenant",
  });

  const changeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getProfileFetch());
  }, []);

  const decideUserPath = () => {
    if (isLogged) {
      history.push("/tenant-home");
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      email: values.email,
      password: values.password,
    };

    set_user(user);
  };

  const set_user = (user) => {
    dispatch(userSigninFetch(user, "tenant"));
  };

  const error = false;

  return (
    <div className="signin-container">
      <div className="staticHeader">
        {decideUserPath()}
        <StaticNavbar />
      </div>
      <div className="signin-form">
        <h3> Sign in</h3>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <div className={error ? "form-field-error" : "form-field"}>
            <label className="form-label"> Email: </label>
            <input
              onChange={(e) => changeValues(e)}
              placeholder="email"
              type="email"
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
            Sign in
          </button>
        </form>
        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
      </div>
    </div>
  );
}
