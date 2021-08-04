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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    width: "100%",
  },
  imageBox: {
    width: "70%",
    height: "70%",
    margin: "3% auto",
  },
  buttonBox: {
    padding: "5% 0%",
  },
  button: {
    width: "30%",
    minWidth: "212px",
    height: "3.2rem",
    padding: "0 0",
    margin: "2% 0%",
  },
  GoogleBtn: {
    backgroundColor: "#FFF",
    "&:hover": {
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.short,
      }),
    },
  },
  NaverBtn: {
    backgroundColor: "#3EAF0E",
    "&:hover": {
      backgroundColor: "#449f1e",
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.short,
      }),
    },
  },
  KakaoBtn: {
    backgroundColor: "#FEE500",
    "&:hover": {
      backgroundColor: "#e5d119",
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.short,
      }),
    },
  },
}));

const onClickGoogle = (e: any) => {
  window.location.href = `${GOOGLE_URL}`;
};
const onClickNaver = (e: any) => {
  window.location.href = `${NAVER_URL}`;
};
const onClickKakao = (e: any) => {
  window.location.href = `${KAKAO_URL}`;
};

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
          src="https://i.scdn.co/image/ab67706c0000bebb56c618ce8634a34df69eea63"
          alt="placeholder"
          width="100%"
          height="100%"
        />
      </div>
      <div className={classes.buttonBox}>
        <Button
          className={`${classes.button} ${classes.GoogleBtn}`}
          variant="outlined"
          name="google"
          onClick={onClickGoogle}
          startIcon={<Glogo />}
          size="large"
        >
          구글로 로그인
        </Button>
        <br></br>
        <Button
          className={`${classes.button} ${classes.NaverBtn}`}
          variant="outlined"
          name="naver"
          onClick={onClickNaver}
          startIcon={<Nlogo />}
          size="large"
        >
          네이버로 로그인
        </Button>
        <br></br>
        <Button
          className={`${classes.button} ${classes.KakaoBtn}`}
          variant="outlined"
          name="kakao"
          onClick={onClickKakao}
          startIcon={<Klogo />}
          size="large"
        >
          카카오톡으로 로그인
        </Button>
      </div>
      <p>TODO: 각 회사에 맞는 버튼들로 교체</p>
    </section>
  );
};

export default Main;
