import React from 'react';
import styled from 'styled-components';
import profilelogo from '../assets/profilelogo.svg';

const ChattingListItem = () => {
  return (
    <ChattingListItemWrapper>
      <ChattingListItemIcon>
        <ChattingListItemIconImg src={profilelogo} />
      </ChattingListItemIcon>
      <ChattingListItemTextWrapper>
        <ChattingListItemName>
          최영주
        </ChattingListItemName>
        <ChattingListItemText>
          안녕하세요~ 동아리 관련 문의드립니다.
        </ChattingListItemText>
      </ChattingListItemTextWrapper>
    </ChattingListItemWrapper>

  );
}

export default ChattingListItem;

const ChattingListItemWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #234E5280;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.10);
  }
`;

const ChattingListItemText = styled.div`
  font-size: 16px;
  margin-top: 5px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285E61;
`;

const ChattingListItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
`;

const ChattingListItemName = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285E61;
`;

const ChattingListItemIcon = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ChattingListItemIconImg = styled.img`
  width: 60px;
  height: 60px;
`;