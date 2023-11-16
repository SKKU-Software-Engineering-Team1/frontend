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
import TagBox from "../components/TagBox";

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

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [campus, setCampus] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdis] = useState(false);
  const [introduction, setIntroduction] = useState("");
  const navigate = useNavigate();

  const getUserInfo = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

    axios
      .get(`${serverUrl}UserInfo/userInfo`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
      })
      .then((response) => {
        const { userAge, userCampus, userEmail, userGender, userName, userPhoneNumber, userIntroduction } = response.data.data;
        const tags = response.data.data.userTags;
        setEmail(userEmail);
        setName(userName);
        setAge(userAge);
        setCampus(userCampus);
        setGender(userGender);
        setPhone(userPhoneNumber);
        setIntroduction(userIntroduction);
        if (tags) setTag(tags);
        else if (tags === null) setTag([]);
      })
      .catch((error) => {
        if (error.response.data.state === 417) {
          console.log("만료");
          // alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          // localStorage.clear();
          // navigate("/signin");
          axios
            .get(`${serverUrl}UserInfo/userInfo`, {
              headers: {
                "Content-Type": "application/json",
                AccessToken: accessToken,
                RefreshToken: refToken,
              },
            })
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("accessToken", response.data.data.accessToken);
              localStorage.setItem("refreshToken", response.data.data.refreshToken);
              getUserInfo();
            })
            .catch((error) => {
              alert("유저 정보를 불러오는데 실패했습니다.");
              localStorage.clear();
              navigate("/signin");
            });
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
          localStorage.clear();
          navigate("/signin");
        }
      });
  };

  const signinChecker = () => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/signin");
    } else getUserInfo();
  };

  const editHandler = () => {
    if (!isEdit) setIsEdis(true);
    else {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
      const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

      const userData = {
        userEmail: email,
        userIntroduction: introduction,
        userTags: tag,
      };

      axios
        .post(`${serverUrl}UserInfo/ModifyInfo`, userData, {
          headers: {
            "Content-Type": "application/json",
            AccessToken: accessToken,
          },
        })
        .then((response) => {
          alert("수정되었습니다.");
        })
        .catch((error) => {
          alert("수정에 실패했습니다.");
        });

      setIsEdis(false);
    }
  };

  const handleIntroductionChange = (e: any) => {
    // event.target.value를 사용하여 textarea의 현재 값에 접근
    const newValue = e.target.value;

    // setIntroduction을 사용하여 introduction 상태를 업데이트
    setIntroduction(newValue);
  };

  useEffect(() => {
    signinChecker();
  }, []);

  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Profile</TitleText>
      </TitleWrapper>
      <ProfileContainer>
        <ProfileWrapper>
          <ProfileLogoWrapper>
            <ProfileLogo src={profilelogo} />
            <ChangePic>Change picture</ChangePic>
          </ProfileLogoWrapper>
          <ProfileTextContainer>
            <ProfileTextWrapper>
              <ProfileTextTitle>Name</ProfileTextTitle>
              <ProfileText>{name}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>Gender</ProfileTextTitle>
              <ProfileText>{gender}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>Age</ProfileTextTitle>
              <ProfileText>{age}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>Phone Number</ProfileTextTitle>
              <ProfileText>{phone}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>email</ProfileTextTitle>
              <ProfileText>{email}</ProfileText>
            </ProfileTextWrapper>
            <ProfileTextWrapper>
              <ProfileTextTitle>Campus</ProfileTextTitle>
              <ProfileText>{campus}</ProfileText>
            </ProfileTextWrapper>
          </ProfileTextContainer>
        </ProfileWrapper>
        {!isEdit && (
          <>
            <AboutMeContainer>
              <AboutMeTitle style={{ whiteSpace: "pre-line" }}>About Me</AboutMeTitle>
              {introduction}
            </AboutMeContainer>
            <TagContainer>
              <TagTitle>Tag</TagTitle>
              <TagWrapper>
                {tag?.map((t: string, i: number) => (
                  <ProfileTag key={i} tagname={t} />
                ))}
              </TagWrapper>
            </TagContainer>
          </>
        )}
        {isEdit && (
          <>
            <AboutMeContainer style={{ whiteSpace: "pre-line" }}>
              <AboutMeTitle>About Me</AboutMeTitle>
              <AboutMeText onChange={handleIntroductionChange} placeholder="About me" />
            </AboutMeContainer>
            <TagContainer>
              <TagTitle>
                Tag
                <IconButton
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  marginStart={"5px"}
                  bg={"white"}
                  size="sm"
                  icon={<TagMenuIcon src={tagMenuIcon} />}
                  aria-label={""}
                  textAlign={"center"}
                />
              </TagTitle>

              {!isOpen && (
                <TagWrapper>
                  {tag?.map((t: string, i: number) => (
                    <ProfileTag key={i} tagname={t} />
                  ))}
                </TagWrapper>
              )}
              {isOpen && <TagBox setTag={setTag} selected={tag} />}
            </TagContainer>
          </>
        )}
      </ProfileContainer>
      <SaveButtonWrapper>
        <Button onClick={editHandler} variant="solid" bg="teal.400" color={"white"} width={"120px"} lineHeight={2.3}>
          {isEdit ? "Save" : "Edit"}
        </Button>
      </SaveButtonWrapper>

      {/* <TitleWrapper>
        <TitleText>관심 추천</TitleText>
      </TitleWrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} paddingLeft={"100px"} paddingRight={"100px"} marginTop={"50px"} marginBottom={"50px"}>
        <PreferenceCard image={"Image needs to be changed"} name={"성균관대학교 동아리"} />
        <PreferenceCard image={"Image needs to be changed"} name={"성균관대학교 동아리"} />
        <PreferenceCard image={"Image needs to be changed"} name={"성균관대학교 동아리"} />
      </Grid> */}
    </div>
  );
};

export default Profile;

const TitleWrapper = styled.div`
  display: flex;
  width: 95%;
  border-bottom: 1px solid #234e52;
  margin-left: 2.5%;
  margin-right: 2.5%;
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
  border-radius: 20px;
  border: 1px solid var(--gray-200, #e2e8f0);
  background: var(--white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
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
  width: 100px;
  height: 100px;
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
