import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TestPage from "@pages/TestPage";
import Main from "@pages/Main";

interface BRouterProps {
  name: string;
  email: string;
}

const BRouter: React.FC<BRouterProps> = ({ name }) => {
  return (
    <Router>
      <nav>
        <Link to="/">메인 화면</Link>
        <Link to="/test">테스트 화면</Link>
        <div>{name}</div>
      </nav>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/test" exact component={TestPage} />
      </Switch>
    </Router>
  );
};

export default BRouter;
