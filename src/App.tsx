import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Article from './pages/Article';
import Profile from './pages/Profile';
import Recruiting from './pages/Recruiting';
import Chatting from './pages/Chat';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/article" element={<Article />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recruiting" element={<Recruiting />} />
            <Route path="/chatting" element={<Chatting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
