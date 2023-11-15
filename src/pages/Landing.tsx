import React from "react";
import NavigationBar from "../components/navigationBar";
import LandingVideo from "../components/landing/LandingVideo";
import styled from "styled-components";

const LandingBar = styled.div`
  width: 100vw;
  height: 100px;
  background-color: white;
`;

const Landing = () => {
  return (
    <div>
      <NavigationBar />
      <LandingBar />
      <LandingVideo />
    </div>
  );
};

export default Landing;
