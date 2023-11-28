// prettier-ignore

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/navigationBar";
import profilelogo from "../assets/profilelogo.svg";
// import { Textarea } from '@chakra-ui/react'
import tagMenuIcon from "../assets/tagmenuicon.svg";
import { IconButton, PopoverTrigger, PopoverContent, Popover, PopoverArrow, PopoverCloseButton, FocusLock, useDisclosure, ButtonGroup, Button, Stack, Grid } from "@chakra-ui/react";
import ProfileTag from "../components/profileTag";
import PreferenceCard from "../components/preferenceCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = (props: any) => {
  return (
    <Stack spacing={4}>
      {/* <TextInput
        label='First name'
        id='first-name'
        ref={firstFieldRef}
        defaultValue='John'
      />
      <TextInput label='Last name' id='last-name' defaultValue='Smith' /> */}
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const ProfileUnion = () => {
  const unionId = new URL(window.location.href).searchParams.get("id");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [dues, setDues] = useState("");
  const [sns, setSns] = useState("");
  const [tag, setTag] = useState([]);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const getUnionInfo = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

    axios
      .get(`${serverUrl}getUniInfo?Id=${unionId}`)
      .then((response) => {
        const { unionName, unionRecruit, unionRecruitDateStart, unionRecruitDateEnd, unionSkkuSub, unionDues, unionSns, unionContactPhone, unionTags } = response.data.data;

        setName(unionName);
        setContents(unionRecruit);
        setDateStart(unionRecruitDateStart);
        setDateEnd(unionRecruitDateEnd);
        setDues(unionDues);
        setSns(unionSns);
        setTag(unionTags);
      })
      .catch((error) => {
        alert("동아리 정보를 불러오는데 실패했습니다.");
      });
    axios
      .get(`${serverUrl}UserInfo/userInfo`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
      })
      .then((response) => {
        const { userName, userRole } = response.data.data;
        setUserName(userName);
        setUserRole(userRole);
      })
      .catch((error) => {
        if (error.response.data.state === 417) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          navigate("/signin");
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
          localStorage.clear();
          navigate("/signin");
        }
      });
  };

  const chatStarter = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

    const userData = {
      receiverEmail: unionId,
      roomName: `${name}지원 - ${userName}`,
    };
    axios
      .post(`${serverUrl}chat/createChatRoom`, userData, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
      })
      .then((response) => {
        alert("채팅방이 생성되었습니다.");
        navigate("/chatting");
      })
      .catch((error) => {
        alert("채팅방 생성에 실패했습니다.");
      });
  };

  const signinChecker = () => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/signin");
    } else getUnionInfo();
  };

  useEffect(() => {
    signinChecker();
  }, []);

  useEffect(() => {
    console.log(`${name}지원 - ${userName}`);
  }, [name, userName]);

  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Article</TitleText>
      </TitleWrapper>
      <ProfileContainer>
        <ProfileTitleContainer>
          <ProfileTitle>{name}</ProfileTitle>
          <ProfileTagContainer>
            {tag.map((t: string, i: number) => (
              <ProfileTag key={i} tagname={t} />
            ))}
          </ProfileTagContainer>
        </ProfileTitleContainer>

        <ProfileWrapper>
          <ProfileLogoWrapper>
            <ProfileLogo src={profilelogo} />
          </ProfileLogoWrapper>

          <ProfileTextContainer>
            <ProfileTextWrapper>
              <ProfileTextTitle>모집 시작</ProfileTextTitle>
              <ProfileText>{dateStart}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>모집 마감</ProfileTextTitle>
              <ProfileText>{dateEnd}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>Fee</ProfileTextTitle>
              <ProfileText>{dues === "없음" ? "Free" : `${dues} ₩`}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>SNS</ProfileTextTitle>
              <ProfileText>{sns}</ProfileText>
            </ProfileTextWrapper>
          </ProfileTextContainer>
        </ProfileWrapper>
        <AboutMeContainer style={{ whiteSpace: "pre-line" }}>
          <AboutMeTitle>We Are</AboutMeTitle>
          {contents}
        </AboutMeContainer>
      </ProfileContainer>
      <SaveButtonWrapper>
        <Button onClick={chatStarter} variant="solid" bg="teal.400" color={"white"} width={"120px"} lineHeight={2.3}>
          {userRole === "ROLE_ADMIN" ? "Edit" : "Contact"}
        </Button>
      </SaveButtonWrapper>
    </div>
  );
};

export default ProfileUnion;

const TitleWrapper = styled.div`
  display: flex;
  width: 95%;
  border-bottom: 1px solid #234e52;
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-bottom: 80px;
`;

const TitleText = styled.div`
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 10px;
  margin-right: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e61;
`;

const ProfileContainer = styled.div`
  margin-top: 40px;
  margin-left: 2.5%;
  margin-right: 2.5%;
  width: 95%;
  height: fit-content;
  margin-bottom: 40px;
`;

const ProfileTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 50px;
`;

const ProfileTitle = styled.div`
  color: #285e61;

  text-align: center;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
`;

const ProfileTagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 400px;
`;

const ProfileLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const ChangePic = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e61;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ProfileTextContainer = styled.div`
  width: 60%;
  margin-top: 60px;
  padding-left: 40px;
  padding-right: 200px;
`;
const ProfileTextTitle = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e6199;
`;

const ProfileText = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e61;
`;

const AboutMeContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-left: 200px;
  padding-right: 200px;
`;

const AboutMeTitle = styled.div`
  color: #285e61;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 7px;
`;

const AboutMeText = styled.textarea`
  height: 100px;
  border-radius: 4px;
  border: 1px solid var(--gray-200, #e2e8f0);
  background: var(--white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 20px;
`;

const TagContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-left: 200px;
  padding-right: 200px;
  margin-bottom: 40px;
`;

const TagTitle = styled.div`
  color: #285e61;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
`;

const TagMenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const TagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2.5%;
  margin-bottom: 40px;
`;
