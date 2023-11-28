import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import Recruiting from "./pages/Recruiting";
import Chatting from "./pages/Chatting";
import { useLocation } from "react-router-dom";
import ProfileUnion from "./pages/ProfileUnion";
import RecruitingStudent from "./pages/RecruitingStudent";

// 페이지 이동 시에도 항상 스크롤이 최상단에 위치하도록
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/article" element={<Article />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/union" element={<ProfileUnion />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/student" element={<RecruitingStudent />} />
          <Route path="/chatting" element={<Chatting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
