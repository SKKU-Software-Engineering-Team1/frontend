import React, { useEffect, useState } from "react";
import NavigationBar from "../components/navigationBar";
import styled from "styled-components";
import profilelogo from "../assets/profilelogo.svg";
import tagMenuIcon from "../assets/tagmenuicon.svg";
import ProfileTag from "../components/profileTag";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruitingStudent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [campus, setCampus] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState(["a", "b", "c"]);
  const [introduction, setIntroduction] = useState("");

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";
    const userId = new URL(window.location.href).searchParams.get("id");

    axios
      .get(`${serverUrl}recruit/userInfo?user_id=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
      })
      .then((response) => {
        const { userName, userGender, userAge, userPhone, userEmail, userCampus, userIntroduction, userTags } = response.data.data;
        setName(userName);
        setGender(userGender);
        setAge(userAge);
        setPhone(userPhone);
        setEmail(userEmail);
        setCampus(userCampus);
        setIntroduction(userIntroduction);
        setTag(userTags);
        console.log(userName);
      })
      .catch((error) => {
        alert("동아리 정보를 불러오는데 실패했습니다.");
      });
  }, []);

  const chatStarter = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

    const userData = {
      receiverEmail: email,
      roomName: name,
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
  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Recruiting</TitleText>
      </TitleWrapper>
      <ProfileContainer>
        <TagContainer>
          <TagWrapper>
            {tag?.map((t: string, i: number) => (
              <ProfileTag key={i} tagname={t} />
            ))}
          </TagWrapper>
        </TagContainer>
        <ProfileWrapper>
          <ProfileLogoWrapper>
            <ProfileLogo src={profilelogo} />
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
        <AboutMeContainer style={{ whiteSpace: "pre-line" }}>
          <AboutMeTitle>About Me</AboutMeTitle>
          <AboutMeText>{introduction}</AboutMeText>
        </AboutMeContainer>
      </ProfileContainer>
      <ButtonWrapper>
        <Link to={`/recruiting`}>
          <Button variant="solid" bg="teal.900" color={"white"} width={"120px"} lineHeight={2.3}>
            Back
          </Button>
        </Link>
        <Button onClick={chatStarter} variant="solid" bg="teal.400" color={"white"} width={"120px"} lineHeight={2.3}>
          Contact
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default RecruitingStudent;

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
  background: var(--white, #fff);
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
  width: 150px;
  height: 150px;
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
  color: rgba(40, 94, 97, 0.6);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const AboutMeText = styled.div`
  height: 100px;
  width: 100%;
  font-size: 18px;
  color: #285e61;
  font-weight: 700;
  line-height: 150%;
  margin-top: 20px;
`;

const TagContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-left: 200px;
  padding-right: 200px;
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
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 230px;
  margin-left: 230px;
  margin-bottom: 40px;
`;
