import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../views/ArticlePage/ArticlePage";
import BoardPage from "../views/BoaedPage/BoardPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";

function Article() {
  return (
    <div>
      <Switch>
        <Route exact path="/Board" component={BoardPage}></Route>
        <Route exact path="/article/:articleId" component={ArticlePage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/edit/:articleId" component={RegisterPage}></Route>
      </Switch>
    </div>
  );
}
export default Article;
