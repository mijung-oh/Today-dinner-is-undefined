import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestPage from "@pages/TestPage";
import Main from "@pages/Main";
import Profile from "@pages/Profile";
import Appbar from "@components/Appbar";

import BoardPage from "../views/BoaedPage/BoardPage";
import ArticlePage from "../views/ArticlePage/ArticlePage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";

//App.tsx에서 내려주는 props들의 타입 여기서 지정
interface BRouterProps {}

const BRouter: React.FC<BRouterProps> = () => {
  // // useSelector 훅을 이용해서 state의 clientLogin store의 name을 getter 했다.

  const [userName, setUserName] = useState<string>("test");
  const [userEmail, setUserEmail] = useState<string>("test@gmail.com");
  //새로고침되면 폐기된다...XX..결국 localStorage를 활용해서 끝
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const JSON_DATA = JSON.parse(data);
      const { name, email } = JSON_DATA;

      setUserName(name);
      setUserEmail(email);
    }
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">메인 화면</Link>
        {Boolean(userName) ? (
          <Link to={`/profile/${userName}`}>프로필 화면</Link>
        ) : (
          <Link to="">암것도 아님</Link>
        )}
        <Link to="/test">테스트 화면</Link>

        <Link to="/Board">게시판페이지</Link>

        <div>
          <span>사용자 : {userName} ||</span>
          <span>&nbsp;이메일 : {userEmail}</span>
        </div>
      </nav>
      <Appbar></Appbar>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/test" exact component={TestPage} />
        <Route path="/profile/:username" component={Profile} />

        <Route path="/Board" exact component={BoardPage}></Route>
        <Route path="/article/:articleId" exact component={ArticlePage}></Route>
        <Route path="/register" exact component={RegisterPage}></Route>
        <Route path="/edit/:articleId" exact component={RegisterPage}></Route>
      </Switch>
    </Router>
  );
};

export default BRouter;
