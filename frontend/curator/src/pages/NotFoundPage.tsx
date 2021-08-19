import React from "react";
import nyancat from "@static/images/cat-nyan-cat.gif";
import { Button } from "@material-ui/core/";
import { useHistory } from "react-router";

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  const pushHome = () => {
    history.push("/articles");
  };
  return (
    <div style={{ textAlign: "center", paddingTop: "25%" }}>
      <h3>앗! 잘못 찾아오신거 같아요!</h3>
      <img src={nyancat} alt="nyancat" />
      <Button fullWidth variant="contained" color="primary" onClick={pushHome}>
        홈으로 가기
      </Button>
    </div>
  );
};

export default NotFoundPage;
