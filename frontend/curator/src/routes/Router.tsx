import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestCompo from "../components/TestCompo";
import TestPage from "@pages/TestPage";
import Main from "@pages/Main";

const BRouter: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">메인 화면</Link>
        <Link to="/test">테스트 화면</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/123" exact component={TestPage} />
      </Switch>
    </Router>
  );
};

export default BRouter;
