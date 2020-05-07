import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip, Image } from "@chakra-ui/core";
import history from "../../history";
import { logoutUser, loginUser } from "../../actions";
import BurgerMenu from "../BurgerMenu";
import CollapseMenu from "../CollapseMenu";

const Navbar = (props) => {
  const name = useSelector((state) => state.user.name);
  const userId = parseInt(localStorage.userId);

  const dispatch = useDispatch();
  // const barAnimation = useSpring({
  //   from: { transform: "translate3d(0, -10rem, 0)" },
  //   transform: "translate3d(0, 0, 0)",
  // });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

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
    localStorage.setItem("userType", "tenant");
    dispatch(loginUser(user, "tenant"));
  };

  const returnTag = (str) => {
    return <h4>{str}</h4>;
  };

  return (
    <>
      <NavBar>
        <FlexContainer>
          <Image width="6%" height="93%" src="/bluefin.png" alt={"logo"} />

          <NavLinks style={linkAnimation}>
            <Link className="homeLink" to="/landlord-home">
              Bluefin - Portal
            </Link>

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
              label={returnTag("View applications for all your rentals!")}
              placement="auto-end"
            >
              <Link to="/landlord-applications">Applications</Link>
            </Tooltip>

            <Tooltip
              label={returnTag("Post another property to rent here!")}
              placement="auto-end"
            >
              <Link to="/add-a-home">Add a Home</Link>
            </Tooltip>

            <Tooltip
              label={returnTag("Look at all rentals.")}
              placement="auto-end"
            >
              <Link to="/tenant-home" onClick={() => handleSwitchClick()}>
                Map
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
