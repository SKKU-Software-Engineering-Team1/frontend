import React, { useState } from "react";
import NavigationBar from "../components/navigationBar";
import styled from "styled-components";
import ChattingListItem from "../components/chattingListItem";
import axios from "axios";
import { useEffect } from "react";

const Chatting = () => {
  const [chattingList, setChattingList] = useState([{}]);

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    // const serverUrl = "http://localhost:8080/";
    const list = [{}];
    axios
      .get(`${serverUrl}api/chat/getChatRoomRecord`, { timeout: 1000 })
      .then((response) => {
        var data = response.data.data;
        for (var i = 0; i < data.length; i++) {
          var roomId = data[i].roomId;
          var lastMessage = data[i].lastMessage;
          var lastSender = data[i].lastSender;

          var chattingListItem = {
            roomId: roomId,
            lastMessage: lastMessage,
            lastSender: lastSender,
          };
          list.push(chattingListItem);
        }
        setChattingList(list);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Chatting</TitleText>
      </TitleWrapper>
      <ChattingListContainer>
        {chattingList.map((chattingListItem: any) => (
          <ChattingListItem roomId={chattingListItem.roomId} lastMessage={chattingListItem.lastMessage} lastSender={chattingListItem.lastSender} />
        ))}
      </ChattingListContainer>
    </div>
  );
};

export default Chatting;

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

const ChattingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 40px;
  margin-bottom: 40px;
`;
