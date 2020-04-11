import React from 'react'
import styled from "styled-components";
import { animated} from "react-spring";
import { Tooltip, Image } from "@chakra-ui/core";







const StaticNavbar = () => {
  


  
  

  return (
    <>
      <NavBar className="staticHeader">
         
          <Image   width="5%" height="90%" src="/bluefin.png" alt={"logo"} />
          
      </NavBar>
   </>
  )
}

export default StaticNavbar

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
  padding: 0 2rem;;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color:#000;
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