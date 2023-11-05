import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { useNavigate } from "react-router-dom";
import profilelogo from '../assets/profilelogo.svg';


const NavigationBar = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState('');

  const navigateToPage = (pageName:any) => {
    navigate(`/${pageName}`);
  };

  useEffect(() => {
    const path = window.location.pathname;
    if(path == '/article'){
      setCurrentPage('article');
    }else if(path == '/chatting'){
      setCurrentPage('chatting');
    }else if(path == '/recruiting'){
      setCurrentPage('recruiting');
    }else if(path == '/profile'){
      setCurrentPage('profile');
    }
  }, []);
  
  const navigateToArticle = () => navigateToPage('article');
  
  const navigateToChatting = () => navigateToPage('chatting');
  
  const navigateToRecruiting = () => navigateToPage('recruiting');

  const navigateToProfile = () =>{
    setCurrentPage('profile');
    navigate("/profile");
  }

  return (
    <NavigationBarWrapper>
        <LogoWrapper>
            <Logo src={logo} />
        </LogoWrapper>
        <NavigationText onClick={navigateToArticle} style={currentPage=='article'? {color: '#285E61'} : {color: '#285E61B2'}}>
            Article
        </NavigationText>
        <NavigationText onClick={navigateToChatting} style={currentPage=='chatting'? {color: '#285E61'} : {color: '#285E61B2'}}>
            Chatting
        </NavigationText>
        <NavigationText onClick={navigateToRecruiting} style={currentPage=='recruiting'? {color: '#285E61'} : {color: '#285E61B2'}}>
            Recruiting
        </NavigationText>
        <ProfileLogoWrapper>
            <ProfileLogo src={profilelogo} onClick={navigateToProfile} />
        </ProfileLogoWrapper>
    </NavigationBarWrapper>
  );
}

export default NavigationBar;

const NavigationBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  border-bottom: 1px solid #234E5299;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-left: 40px;
  margin-right: 60px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const NavigationText = styled.div`
  margin-left: 60px;
  margin-right: 60px;
  font-size: 18px;
  font-weight: 700;
  line-height: 150%;
  color: #285E61B2;
  cursor: pointer;
`;

const ProfileLogoWrapper = styled.div`
  margin-left: auto;
  margin-right: 40px;
`;

const ProfileLogo = styled.img`
  width: 40px;
  height: 40px;
`;