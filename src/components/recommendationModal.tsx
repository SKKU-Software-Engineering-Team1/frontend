
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from "@chakra-ui/react";
import axios from "axios";

const RecommendationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {

  type ChattingListType = Array<Array<string>>;

  const [chattingList, setChattingList] = useState([["", ""]]);
  const [chat, setChat] = useState("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onClickSend();
    }
  };

  const onChangeChat = (e: any) => {
    setChat(e.target.value);
  };

  const onClickSend = () => {
    var myChat = ["me", chat];
    setChattingList([...chattingList, myChat]);
    axios
    .post(`localhost:5000/process_question`, {
      question: chat,
    })
    .then((response) => {
      var yourChat = ["you", response.data.answer];
      setChattingList([...chattingList, yourChat]);
    })

    setChat("");
  };

  return (
  <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
  <ModalOverlay />
  <ModalContent padding={"10px"} maxHeight={"650px"}>
    <ModalHeader>Recommendation</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <ChatContainer>
        {chattingList.map((chat) => {
          if (chat[0] == "") {
            return
          } else
          if (chat[0] == "me") {
            return (
              <MyChatWrapper>
                <MyChat>{chat[1]}</MyChat>
              </MyChatWrapper>
            );
          } else {
            return (
              <YourChatWrapper>
                <YourChat>{chat[1]}</YourChat>
              </YourChatWrapper>
            );
          }
        })}
        <div ref={messageEndRef}></div>
      </ChatContainer>
    </ModalBody>
    <ModalFooter>
      <Input onChange={onChangeChat} onKeyPress={handleOnKeyPress} value={chat} placeholder="Basic usage" borderRadius="full" />
      <Button onClick={onClickSend} bg="teal.400" mr={3} color={"white"} marginLeft={"10px"} borderRadius={"full"}>
        Send
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  );
}

export default RecommendationModal;


const MyChatWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const MyChat = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px 0px 20px 20px;
  border: 1px solid rgba(194, 194, 194, 0.5);
  background: #fff;
  color: rgba(0, 0, 0, 0.6);
  text-align: right;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  max-width: 70%;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const YourChat = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 0px 20px 20px 20px;
  background: var(--teal-400, #38b2ac);
  color: var(--white, #fff);
  color: #edf2f7;
  text-align: left;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  max-width: 70%;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const YourChatWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  padding: 10px;
`;

const InitialText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.6);
`;
