import React, { useState } from "react";
import styled from "styled-components";
import signImg from "../assets/signimg.png";
import logo from "../assets/logo.svg";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const onClickLogin = () => {
    // const serverUrl = process.env.REACT_APP_SERVER_URL;
    const serverUrl = 'http://localhost:8080/api/'
    const userData = {
      userEmail: email,
      userPassword: password,
    };

    // Replace 'your_login_api_url' with the actual URL of your login API
    axios
      .post(`${serverUrl}login/login`, userData)
      .then((response) => {
        const { accessToken, refreshToken } = response.data.data;
        console.log(response.data.data)

        // accessToken을 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);
        axios.defaults.headers.common["AccessToken"] = accessToken

        // refreshToken을 localStorage에 저장
        localStorage.setItem("refreshToken", refreshToken);

        // axios.defaults.headers.common["RefreshToken"] = refreshToken

        navigate("/chatting");
      })
      .catch((error) => {
        // 로그인에 실패했을 때의 처리
        // 에러 메시지를 표시하거나 다른 동작을 수행할 수 있습니다.
        console.error("로그인 실패:", error);
      });
  };

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <ImgWrapper>
        <Img src={signImg} />
      </ImgWrapper>
      <InputContainer>
        <LogoImg src={logo} />
        <InputWrapper>
          <InputText>Email</InputText>
          <Input placeholder="Email" onChange={onChangeEmail} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password</InputText>
          <Input placeholder="Password" type="password" onChange={onChangePassword} />
        </InputWrapper>
        <Button variant="solid" bg="teal.400" color={"white"} width={"100%"} marginTop={"40px"} onClick={onClickLogin}>
          LOGIN
        </Button>
        <RegisterWrapper>
          <RegisterText onClick={navigateToSignUp}>Register Here</RegisterText>
        </RegisterWrapper>
      </InputContainer>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 550px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  width: 550px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const InputText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 5px;
`;

const RegisterWrapper = styled.div`
  width: 100%;
`;
const RegisterText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5px;
  color: #285e61;
  cursor: pointer;
`;
