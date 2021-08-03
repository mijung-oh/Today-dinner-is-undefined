import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleCreate from "../components/ArticleCreate";
import ArticleDetail from "../components/ArticleDetail";
import ArticleHome from "../components/ArticleHome";
import ArticleUpdate from "../components/ArticleUpdate";

function Articles() {
  return (
    <Switch>
      <Route path="/articles/update/:id" component={ArticleUpdate} />
      <Route path="/articles/create" component={ArticleCreate} />
      <Route path="/articles/detail/:id" component={ArticleDetail} />
      <Route path="/articles/" component={ArticleHome} />
    </Switch>
  );
}

export default Articles;
