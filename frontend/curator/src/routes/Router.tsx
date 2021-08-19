import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "@pages/MainPage";
import ProfilePage from "@pages/ProfilePage";
import AuthloginPage from "@pages/AuthloginPage";
import RecommendPage from "@pages/RecommendPage";
import NotFoundPage from "@pages/NotFoundPage";
import Appbar from "@components/Appbar";
import BottomNav from "@components/BottomNav";
import { useSelector } from "react-redux";

import { RootState } from "modules";

import RecoRecipe from "../Articles/components/RecoRecipe";
import UserScrap from "../Articles/page/UserScrap";
import RecipeList from "../Articles/components/RecipeList";
import ArticleUpdate from "../Articles/components/ArticleUpdate";
import UserRecipe from "../Articles/components/UserRecipe";
import ArticleCreate from "../Articles/components/ArticleCreate";
import ArticleDetail from "../Articles/components/ArticleDetail";
import ArticleHome from "../Articles/components/ArticleHome";
//App.tsx에서 내려주는 props들의 타입 여기서 지정
import { useHistory } from "react-router-dom";
interface BRouterProps {}

const BRouter: React.FC<BRouterProps> = () => {
  // // useSelector 훅을 이용해서 state의 clientLogin store의 name을 getter 했다.
  const name = useSelector((state: RootState) => state.clientLogin.name);
  const Email = useSelector((state: RootState) => state.clientLogin.email);

  const [isAuth, setAuth] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    if (name && Email) {
      setAuth(true);
      history.push("/articles");
    } else {
      setAuth(false);
    }
  }, [name, Email, history]);

  return (
    <Router>
      {isAuth ? <Appbar /> : null}
      {/* <Appbar /> */}
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/profile/:nickname" component={ProfilePage} />
        <Route path="/oauth/:socialCompany" component={AuthloginPage} />
        <Route path="/recorecipe/detail/:id" component={RecoRecipe} />
        <Route path="/userscrap" component={UserScrap} />
        <Route path="/recipe" component={RecipeList} />
        <Route path="/update/:id" component={ArticleUpdate} />
        <Route path="/userrecipe/detail/:id" component={UserRecipe} />
        <Route path="/articles/create" component={ArticleCreate} />
        <Route path="/articles/detail/:id" component={ArticleDetail} />
        <Route path="/articles" component={ArticleHome} />
        <Route path="/recommend" component={RecommendPage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
      {isAuth ? <BottomNav /> : null}
      {/* <BottomNav /> */}
    </Router>
  );
};

export default BRouter;
