import React, { useState } from "react";
import styled from "styled-components";
import signImg from "../assets/signimg.png";
import logo from "../assets/logo.svg";
import { Input, Button, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(1);

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const onClickSubmit = () => {
    console.log(email, password, passwordCheck, name, age, gender);
    if (password != passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    //sign up api

    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setName("");
    setAge("");
    setGender(1);
  };
  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeGender = (e: any) => {
    setGender(e);
  };

  const onChangeAge = (e: any) => {
    setAge(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (e: any) => {
    setPasswordCheck(e.target.value);
  };

  return (
    <Container>
      <ImgWrapper>
        <Img src={signImg} />
      </ImgWrapper>
      <InputContainer>
        <LogoImg src={logo} />
        <InputWrapper>
          <InputText>Name</InputText>
          <Input placeholder="Name" onChange={onChangeName} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Gender</InputText>
          <RadioGroup defaultValue="1" onChange={onChangeGender}>
            <Stack spacing={5} direction="row">
              <Radio colorScheme="teal" value="1">
                Male
              </Radio>
              <Radio colorScheme="teal" value="2">
                Female
              </Radio>
            </Stack>
          </RadioGroup>
        </InputWrapper>
        <InputWrapper>
          <InputText>Age</InputText>
          <Input placeholder="Age" type="number" onChange={onChangeAge} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Email</InputText>
          <Input placeholder="Email" type="email" onChange={onChangeEmail} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password</InputText>
          <Input placeholder="Password" type="Password" onChange={onChangePassword} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password Check</InputText>
          <Input placeholder="Password Check" type="Password" onChange={onChangePasswordCheck} />
        </InputWrapper>

        <Button variant="solid" bg="teal.400" color={"white"} width={"100%"} height={"100px"} marginTop={"40px"} lineHeight={2.3} onClick={onClickSubmit}>
          SUBMIT
        </Button>
        <RegisterWrapper>
          <RegisterText>Already have an account?</RegisterText>
          <SigninText onClick={navigateToSignIn}>Sign in</SigninText>
        </RegisterWrapper>
      </InputContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100vw;
  height: calc(100vh);
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  width: 550px;
`;

const Img = styled.img`
  width: 100%;
`;

const InputContainer = styled.div`
  width: 550px;
  height: 630px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  display: flex;
`;
const RegisterText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5px;
  margin-right: 5px;
`;

const SigninText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5px;
  color: #285e61;
  cursor: pointer;
`;
