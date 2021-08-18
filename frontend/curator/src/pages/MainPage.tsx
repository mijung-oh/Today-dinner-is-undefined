import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../modules/clientLogin";
import { codeExtractor } from "@lib/helper";
import { GOOGLE_URL, NAVER_URL, KAKAO_URL } from "@lib/constants";
import Glogo from "@static/logos/G-logo";
import Nlogo from "@static/logos/N-logo";
import Klogo from "@static/logos/K-logo";
import Castle from "@static/images/castle.jpg";
import { url } from "inspector";
import SocialLogin from "@Index/components/SocialLogin";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    padding: "10%  0",
    justifyContent: "center",
  },
  imageBox: {
    width: "40%",
    height: "40%",
    margin: "3% 5%",
    display: "inline-block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
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
      <div className={classes.imageBox}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/51kWtSPhfBL._SY445_SX342_QL70_ML2_.jpg"
          alt="placeholder"
          width="100%"
          height="100%"
        />
      </div>
      <SocialLogin />
    </section>
  );
};

export default Main;
