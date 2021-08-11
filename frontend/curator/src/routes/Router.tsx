import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestPage from "@pages/TestPage";
import MainPage from "@pages/MainPage";
import ProfilePage from "@pages/ProfilePage";
import AuthloginPage from "@pages/AuthloginPage";
import RecommandPage from "@pages/RecommandPage";
import Appbar from "@components/Appbar";
import BottomNav from "@components/BottomNav";
import { useSelector } from "react-redux";

import { RootState } from "modules";
import Articles from "../Articles/route/Articles";
//App.tsx에서 내려주는 props들의 타입 여기서 지정
interface BRouterProps {}

const BRouter: React.FC<BRouterProps> = () => {
  // // useSelector 훅을 이용해서 state의 clientLogin store의 name을 getter 했다.
  const name = useSelector((state: RootState) => state.clientLogin.name);
  const Email = useSelector((state: RootState) => state.clientLogin.email);

  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (name && Email) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [name, Email]);

  return (
    <Router>
      {/* {isAuth ? <Appbar /> : null} */}
      <Appbar />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/test" exact component={TestPage} />
        <Route path="/profile/:nickname" component={ProfilePage} />
        <Route path="/oauth/:socialCompany" component={AuthloginPage} />
        <Route path="/articles" component={Articles} />
        <Route path="/recommand" component={RecommandPage} />
      </Switch>
      {/* {isAuth ? <BottomNav /> : null} */}
      <BottomNav />
    </Router>
  );
};

export default BRouter;
