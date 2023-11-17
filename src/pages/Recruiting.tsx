import React, { useEffect, useState } from "react";
import NavigationBar from "../components/navigationBar";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputRightAddon, Select, Grid } from "@chakra-ui/react";
import RecruitingCard from "../components/recruitingCard";

const Recruiting = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${serverUrl}UserInfo/userInfo`)
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

  const handleTagChange = (e: any) => {
    const tag = e.target.value;
    setSelectedTag(tag);
  };

  const profilecontents = {
    name: "최영주",
    introduce: "안녕하세요. 저의 이름은 최영주고 취미는 운동과 코딩이며 다양한 사람들과 어울리는 것을 좋아합니다. 평소 코딩 동아리에 관심이 있어 지원하고 싶어 가입했습니다. ",
    tags: ["친목", "스포츠", "제작"]
  }

  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Recruiting</TitleText>
        <InputWrapper>
          <InputGroup size="sm" width={"270px"}>
            <Input placeholder="동아리를 검색해 보세요" />
            <InputRightAddon children={""} />
          </InputGroup>
        </InputWrapper>
      </TitleWrapper>
      <SelectWrapper>
        <Select placeholder="TAG" size="sm" width={"120px"} marginEnd={"15px"} onChange={handleTagChange}>
          {tags.map((tag: string) => (
            <option value={tag}>{tag}</option>
          ))}
        </Select>
        <Select placeholder="All View" width={"120px"} size="sm">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <SortTextWrapper>
          <SortText>가나다순</SortText>
          <SortText>|</SortText>
          <SortText>최신순</SortText>
        </SortTextWrapper>
      </SelectWrapper>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={10} paddingLeft={"100px"} paddingRight={"100px"}>
        <RecruitingCard contents={profilecontents} />
        <RecruitingCard contents={profilecontents} />
        <RecruitingCard contents={profilecontents} />
        <RecruitingCard contents={profilecontents} />
        <RecruitingCard contents={profilecontents} />
        
      </Grid>
    </div>
  );
};

export default Recruiting;


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

const InputWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: 0px;
`;

const SelectWrapper = styled.div`
  display: flex;
  margin-left: 2.5%;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SortText = styled.div`
  color: #285e61;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-left: 10px;
`;

const SortTextWrapper = styled.div`
  margin-left: auto;
  margin-right: 2.5%;
  display: flex;
`;
