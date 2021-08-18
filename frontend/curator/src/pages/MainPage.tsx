import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../modules/clientLogin";
import { codeExtractor } from "@lib/helper";
// import { url } from "inspector";
import SocialLogin from "@Index/components/SocialLogin";
import AppPreview from "@Index/components/AppPreview";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    padding: "10%  0",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface MainProps {}

const Main: React.FC<MainProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const authURL = history.location.search;
    if (authURL.includes("code")) {
      const code = codeExtractor(authURL);
      const LOGIN_URL =
        "http://127.0.0.1:9000/curation/google/auth?code=" + code;
      const config = {
        withCredentials: true,
      };
      try {
        axios.get(LOGIN_URL, config).then((res) => {
          const userData = res.data.response;
          const { name, email, nickname } = userData;
          dispatch(getUserInfo(name, email, nickname));
          history.push("/");
        });
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [dispatch, history]);

  const classes = useStyles();
  return (
    <section className={classes.container}>
      <AppPreview />
      <SocialLogin />
    </section>
  );
};

export default Main;
