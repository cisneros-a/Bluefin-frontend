import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { Image } from "@chakra-ui/core";

const StaticNavbar = () => {
  return (
    <>
      <NavBar className="staticHeader">
        <Image width="5%" height="90%" src="/bluefin.png" alt={"logo"} />
      </NavBar>
    </>
  );
};

export default StaticNavbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #008080;
  z-index: 1;
  font-size: 1.4rem;
`;
