import React, { useState } from 'react';
import styled from 'styled-components';
import signImg from '../assets/signimg.png';
import logo from '../assets/logo.svg';
import { Input, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSignUp = () => {
    navigate('/signup');
  }

  const onClickLogin = () => {
    setEmail('');
    setPassword('');
    //login api
  }

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  }

  return (
    <Container>
      <ImgWrapper>
        <Img src={signImg} />
      </ImgWrapper>
      <InputContainer>
        <LogoImg src={logo} />
        <InputWrapper>
          <InputText>Email</InputText>
          <Input placeholder='Email' onChange={onChangeEmail} />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password</InputText>
          <Input placeholder='Password' type='password' onChange={onChangePassword} />
        </InputWrapper> 
        <Button variant='solid' bg='teal.400' color={'white'} width={'100%'} marginTop={'40px'} onClick={onClickLogin} >
          LOGIN
        </Button>
        <RegisterWrapper>
          <RegisterText onClick={navigateToSignUp}>
            Register Here
          </RegisterText>
        </RegisterWrapper>
      </InputContainer>
    </Container>
  );
}

export default SignIn;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  padding: 60px;
  display: flex;
  justify-content: center;
`;

const ImgWrapper = styled.div`
  width: 550px;
`;

const Img= styled.img`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  width: 550px;
  height: 100%;
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
`

const RegisterWrapper = styled.div`
  width: 100%;
`;
const RegisterText = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5px;
  color: #285E61;
  cursor: pointer;
`