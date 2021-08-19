import DetailPage from "Articles/page/DetailPage";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleCreate from "../components/ArticleCreate";
import ArticleDetail from "../components/ArticleDetail";
import ArticleHome from "../components/ArticleHome";
import ArticleUpdate from "../components/ArticleUpdate";
import RecipeList from "../components/RecipeList";
import RecoRecipe from "../components/RecoRecipe";
import UserRecipe from "../components/UserRecipe";
import UserScrap from "../page/UserScrap";

function Articles() {
  return (
    <Switch>
      <Route path="/recorecipe/detail/:id" component={RecoRecipe} />
      <Route path="/userscrap" component={UserScrap} />
      <Route path="/recipe" component={RecipeList} />
      <Route path="/update/:id" component={ArticleUpdate} />
      <Route path="/userrecipe/detail/:id" component={UserRecipe} />
      <Route path="/articles/create" component={ArticleCreate} />
      <Route path="/articles/detail/:id" component={ArticleDetail} />
      <Route path="/articles" component={ArticleHome} />
    </Switch>
  );
}

export default Articles;
