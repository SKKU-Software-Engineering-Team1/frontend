import React from "react";
import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Text, Divider, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import profilelogo from "../assets/profilelogo.svg";
import styled from "styled-components";
import RecruitingCardTag from "./recruitingCardTag";

const RecruitingCard = (props: any) => {
  const contents = props.contents;
  console.log(contents);

  return (
    <div>
      <Card width="250px">
        <CardBody>
          <CardContents>
            <ProfileImg src={profilelogo} />
            <NameText>{contents.name}</NameText>
            {contents.introduce && <IntroduceText>{contents.introduce.substring(0, 50) + "..."}</IntroduceText>}
            {!contents.introduce && <IntroduceText> </IntroduceText>}
            <TagWrapper>
              {contents.tags.map((tag: string) => (
                <RecruitingCardTag tagname={"# " + tag} />
              ))}
            </TagWrapper>
          </CardContents>
        </CardBody>
        <CardFooter>
          <ButtonWrapper>
            <Link to={`/student/?id=${contents.id}`}>
              <Button variant="solid" colorScheme="blue" size="sm" width="200px" bg="teal.400">
                Read More
              </Button>
            </Link>
          </ButtonWrapper>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecruitingCard;

const CardContents = styled.div`
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding-left: "30px",
  padding-right: "30px",
`;

const NameText = styled.div`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 15px;
`;

const IntroduceText = styled.div`
  color: #285e61;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
`;
