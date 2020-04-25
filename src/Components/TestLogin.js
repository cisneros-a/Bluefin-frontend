import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/core";
import StaticNavbar from "./StaticNavbar";

export default function TestLogin() {
  return (
    <>
      <div className="staticHeader">
        <StaticNavbar />
      </div>
      <div className="signin-container">
        <h3>Sign In: </h3>
        <div className="signin-form">
          <FormControl isRequired>
            <FormLabel htmlFor="fname">First name</FormLabel>
            <div className="input-field">
              <Input
                isFullWidth="false"
                size="lg"
                id="fname"
                placeholder="First name"
              />
            </div>
            <FormLabel htmlFor="fname">Password</FormLabel>
            <div className="input-field">
              <Input
                isFullWidth="false"
                size="lg"
                id="fname"
                placeholder="First name"
                type="password"
              />
            </div>
          </FormControl>
          {/* <form>
          <label>Username :</label>
          <input
            className="input-field"
            type="text"
            name="username"
            value=""
          ></input>
          <label> Password :</label>
          <input
            className="input-field"
            type="text"
            name="username"
            value=""
          ></input>
          <div>
            <label for="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" />
          </div>
          <div>
            <label for="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" />
          </div>
          </form> */}
        </div>
      </div>
    </>
  );
}
