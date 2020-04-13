import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { logoutUser, loginUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import history from "../../history";
import { Link } from "react-router-dom";
import { Tooltip, Image } from "@chakra-ui/core";

// import Brand from "./Brand";
import BurgerMenu from "../BurgerMenu";
import CollapseMenu from "../CollapseMenu";

const Navbar = (props) => {
  const name = useSelector((state) => state.user.name);
  const userId = parseInt(localStorage.userId);

  const dispatch = useDispatch();
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)",
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const handleClick = () => {
    console.log("clicked");
  };

  const handleLogoutClick = (event) => {
    history.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");

    dispatch(logoutUser());
  };

  const handleSwitchClick = () => {
    let user = {
      name: name,
      id: userId,
    };
    console.log({ user });
    localStorage.setItem("userType", "landlord");
    dispatch(loginUser(user, "landlord"));
  };

  const returnTag = (str) => {
    return <h4>{str}</h4>;
  };

  return (
    <>
      <NavBar>
        <FlexContainer>
          <Image width="5%" height="90%" src="/bluefin.png" alt={"logo"} />

          {/* <img src="/bluefin.png" alt='logo'></img> */}
          <NavLinks style={linkAnimation}>
            <Link to="/tenant-home">Bluefin</Link>

            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications"></Link>
            </Tooltip>

            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications"></Link>
            </Tooltip>
            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications"></Link>
            </Tooltip>
            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications"></Link>
            </Tooltip>
            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications"></Link>
            </Tooltip>

            <Tooltip
              label={returnTag("View all of your pending home applications!")}
              placement="auto-end"
            >
              <Link to="/tenant-applications">My Applications</Link>
            </Tooltip>

            <Tooltip
              label={returnTag("Everything reagrding your lease!")}
              placement="auto-end"
            >
              <Link to="/my-lease">My Lease</Link>
            </Tooltip>

            <Tooltip
              label={returnTag("Manage all your properties here!")}
              placement="auto-end"
            >
              <Link to="/landlord-home" onClick={() => handleSwitchClick()}>
                {" "}
                Portal{" "}
              </Link>
            </Tooltip>

            <Link onClick={() => handleLogoutClick()} to="/">
              Log Out
            </Link>

            {/* <a onClick={() => handleLogoutClick()}>Sign Out</a>
            <a  onClick={() => handleClick()} >link n4</a> */}
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #008080;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fff;
      border-bottom: 1px solid #fff;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;
