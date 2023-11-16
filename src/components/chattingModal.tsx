import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from "@chakra-ui/react"
import axios from 'axios';

const ChattingModal = ({ isOpen, onClose, id }: {isOpen: boolean, onClose: () => void, id: string} ) => {

  const [initialText, setInitialText] = useState('')
  const [chattingList, setChattingList] = useState([['', '']])
  const [chat, setChat] = useState('')
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const [myName, setMyName] = useState('')
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
  const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

  useEffect(() => {
    // const serverUrl = 'http://localhost:8080/';
    var chattingList = [['','']]

    var myName = ''
    axios
    .get(`${serverUrl}UserInfo/userInfo`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
      })
      .then((response) => {
        myName = response.data.data.userName
        setMyName(myName)
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${serverUrl}chat/findAllTextWithRoomID/${id}`)
      .then((response) => {
        console.log(response.data);
        var data = response.data.data
        var initialText = data[0].chatTextContent
        setInitialText(initialText)

        for (var i = 1; i < data.length; i++) {
          var sender = data[i].chatTextWriter == myName ? 'me' : 'you'
          var text = data[i].chatTextContent
          var chat = [sender, text]
          chattingList.push(chat)
        }

      })
      .catch((error) => {
        console.log(error);
      });

    setChattingList(chattingList)
  }, [])
  //TODO: Setinterval

  useEffect(() => {
    if (messageEndRef.current){
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chattingList]);

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onClickSend();
    }
  };

  const onChangeChat = (e: any) => {
    setChat(e.target.value)
  }

  const onClickSend = () => {
    var myChat = ['me', chat]
    setChattingList([...chattingList, myChat])

    axios.post(`${serverUrl}chat/requestChat`, {
      roomId: id,
      chatTextWriter: myName,
      chatTextContent: chat
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }
    );

    setChat('')
  }
  

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
        <ModalOverlay />
        <ModalContent padding={'10px'} maxHeight={'650px'}>
          <ModalHeader>최영주님과의 채팅</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChatContainer>
              <InitialText>
                {initialText}
              </InitialText>
              {/* <MyChatWrapper>
                <MyChat>
                  안녕하세요~
                </MyChat>
              </MyChatWrapper>
              <YourChatWrapper>
                <YourChat>
                  안녕하세요~..우와아아ㅏ앙ㅇ닐ㅇ랑넹ㄹㄴㅁ엔렌네퍼ㅡㅔㅇㄹ페
                </YourChat>
              </YourChatWrapper> */}
              {chattingList.map((chat) => {
                if (chat[0] == 'me'){
                  return (
                    <MyChatWrapper>
                      <MyChat>
                        {chat[1]}
                      </MyChat>
                    </MyChatWrapper>
                  )
                } else {
                  return (
                    <YourChatWrapper>
                      <YourChat>
                        {chat[1]}
                      </YourChat>
                    </YourChatWrapper>
                  )
                }
              })}
              <div ref={messageEndRef}></div> 
            </ChatContainer>
          </ModalBody>
          <ModalFooter>
            <Input onChange={onChangeChat} onKeyPress={handleOnKeyPress} value={chat} placeholder='Basic usage' borderRadius='full'/>
            <Button onClick={onClickSend} bg="teal.400" mr={3} color={"white"} marginLeft={"10px"} borderRadius={'full'}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default ChattingModal;

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
  border: 1px solid rgba(194, 194, 194, 0.50);
  background: #FFF;
  color: rgba(0, 0, 0, 0.60);
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
  background: var(--teal-400, #38B2AC);
  color: var(--white, #FFF);
  color: #EDF2F7;
  text-align: left;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  max-width: 70%;
  margin-left: 10px;
  margin-bottom: 10px;
`

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
  color: rgba(0, 0, 0, 0.60);
`;