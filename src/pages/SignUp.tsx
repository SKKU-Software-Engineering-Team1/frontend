import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import signImg from '../assets/signimg.png';
import logo from '../assets/logo.svg';
import { Input, Button, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TagBox from '../components/TagBox';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(1);
  const [campus, setCampus] = useState(1);
  const [phone, setPhone] = useState('');
  const [tag, setTag] = useState([]);

  const navigateToSignIn = () => {
    navigate('/signin');
  };

  const onClickSubmit = () => {
    if (!email || !password || !passwordCheck || !name || !age || !phone) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (tag.length === 0) {
      alert('하나 이상의 태그를 선택해 주세요.');
      return;
    }
    if (password != passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!(email.endsWith('@skku.edu') || email.endsWith('@g.skku.edu'))) {
      alert('성균관대학교 학생만 가입 가능합니다.');
      return;
    }
    //sign up api
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    // const serverUrl = "http://localhost:8080/api/";
    const userData = {
      userEmail: email,
      userPassword: password,
      userAge: age,
      userName: name,
      userGender: gender === 1 ? 'MALE' : 'FEMALE',
      userPhoneNumber: phone,
      userCampus:
        campus === 1 ? 'HUMANITIES_AND_SOCIAL_SCIENCES' : 'NATURAL_SCIENCE',
      userTags: tag,
    };

    // Replace 'your_login_api_url' with the actual URL of your login API
    axios
      .post(`${serverUrl}login/signUp`, userData)
      .then((response) => {
        alert('회원가입이 완료되었습니다.');

        navigate('/signin');
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert('회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
      });

    setEmail('');
    setPassword('');
    setPasswordCheck('');
    setName('');
    setAge('');
    setGender(1);
  };
  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeGender = (e: any) => {
    setGender(e);
  };

  const onChangeCampus = (e: any) => {
    setCampus(e);
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

  const onChangePhone = (e: any) => {
    setPhone(e.target.value);
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
          <InputText>Campus</InputText>
          <RadioGroup defaultValue="1" onChange={onChangeCampus}>
            <Stack spacing={5} direction="column">
              {' '}
              <Radio colorScheme="teal" value="1">
                Humanities and Social Sciences
              </Radio>
              <Radio colorScheme="teal" value="2">
                Natural Science
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
          <InputText>Phone</InputText>
          <Input
            placeholder="010-XXXX-XXXX"
            type="text"
            onChange={onChangePhone}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password</InputText>
          <Input
            placeholder="Password"
            type="Password"
            onChange={onChangePassword}
          />
        </InputWrapper>
        <InputWrapper>
          <InputText>Password Check</InputText>
          <Input
            placeholder="Password Check"
            type="Password"
            onChange={onChangePasswordCheck}
          />
        </InputWrapper>
        <TagBox setTag={setTag} selected={tag} />

        <Button
          variant="solid"
          bg="teal.400"
          color={'white'}
          width={'100%'}
          height={'100px'}
          marginTop={'40px'}
          lineHeight={2.3}
          onClick={onClickSubmit}
        >
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
