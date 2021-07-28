import RegisterPage from "@components/views/RegisterPage/RegisterPage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePage from "../views/ArticlePage/ArticlePage";
import BoardPage from "../views/BoaedPage/BoardPage";

function Article() {
  return (
    <div>
      hello
      <Switch>
        <Route exact path="/" component={BoardPage}></Route>
        <Route exact path="/article/:articleId" component={ArticlePage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/edit/:articleId" component={RegisterPage}></Route>
      </Switch>
    </div>
  );
}
export default Article;
