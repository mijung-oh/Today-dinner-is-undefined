import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleCreate from "../components/ArticleCreate";
import ArticleDetail from "../components/ArticleDetail";
import ArticleHome from "../components/ArticleHome";
import ArticleUpdate from "../components/ArticleUpdate";
import RecipeDetail from "../components/RecipeDetail";
import RecipeList from "../components/RecipeList";
import UserScrap from "../page/UserScrap";

function Articles() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/recipe" exact component={RecipeList} />
        <Route path="/articles/update/:id" component={ArticleUpdate} />
        <Route path="/articles/create" component={ArticleCreate} />
        <Route path="/articles/detail/:id" component={ArticleDetail} />
        <Route path="/articles" component={ArticleHome} />
        <Route path="/userScrap" component={UserScrap} />
        <Route path="/recipe/detail/:id" component={RecipeDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default Articles;
