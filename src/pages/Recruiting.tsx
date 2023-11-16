import React, { useEffect } from "react";
import NavigationBar from "../components/navigationBar";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recruiting = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${serverUrl}api/UserInfo/userInfo`)
      .then((response) => {
        let userRole = response.data.data.userRole;
        if (userRole != "ROLE_ADMIN") {
          alert("동아리 운영진만 접근 가능합니다.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavigationBar />
    </div>
  );
};

export default Recruiting;
