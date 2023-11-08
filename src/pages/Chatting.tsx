import React from 'react';
import NavigationBar from '../components/navigationBar';
import styled from 'styled-components';
import ChattingListItem from '../components/chattingListItem';

const Chatting = () => {
  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>
          Chatting
        </TitleText>
      </TitleWrapper>
      <ChattingListContainer>
        <ChattingListItem />
        <ChattingListItem />
        <ChattingListItem />
      </ChattingListContainer>
    </div>
  );
}

export default Chatting;

const TitleWrapper = styled.div`
  display: flex;
  width: 95%;
  border-bottom: 1px solid #234E52;
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
  color: #285E61;
`;

const ChattingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 40px;
  margin-bottom: 40px;
`;