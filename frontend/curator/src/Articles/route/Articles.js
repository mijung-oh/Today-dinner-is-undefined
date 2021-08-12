import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleCreate from "../components/ArticleCreate";
import ArticleDetail from "../components/ArticleDetail";
import ArticleHome from "../components/ArticleHome";
import ArticleUpdate from "../components/ArticleUpdate";
import RecipeList from "../components/RecipeList";
import UserScrap from "../page/UserScrap";

function Articles() {
  return (
    <Switch>
      <Route path="/userScrap" component={UserScrap} />
      <Route path="/recipe" component={RecipeList} />
      <Route path="/articles/update/:id" component={ArticleUpdate} />
      <Route path="/articles/create" component={ArticleCreate} />
      <Route path="/articles/detail/:id" component={ArticleDetail} />
      <Route path="/articles" component={ArticleHome} />
    </Switch>
  );
}

export default Articles;
