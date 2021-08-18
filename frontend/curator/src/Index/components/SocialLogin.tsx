import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { GOOGLE_URL, NAVER_URL, KAKAO_URL } from "@lib/constants";
import Glogo from "@static/logos/G-logo";
import Nlogo from "@static/logos/N-logo";
import Klogo from "@static/logos/K-logo";
import omijung from "@static/images/omijung-logo.png";
import { Tween, SplitChars } from "react-gsap";

const useStyles = makeStyles((theme: Theme) => ({
  lineWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "25%",
  },
  logoWrapper: {
    marginBottom: "15%",
  },
  fakeLine: {
    height: "1px",
    width: "30%",
    backgroundColor: "#bdbdbd",
  },
  keynoteBox: {
    border: "6px solid #bdbdbd",
    borderRadius: "15px",
    backgroundColor: "#f5f5f5",
    padding: "10% 0",
    marginBottom: "15%",
  },
  buttonWrapper: {
    display: "inline-block",
    justifyContent: "center",
    padding: "5% 10%",
    backgroundColor: "white",
    border: "solid 1px #bdbdbd",
  },
  buttonBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    width: "25%",
    minWidth: "212px",
    height: "3.2rem",
    padding: "0 0",
    margin: "1% 0%",
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
const SocialLogin: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.buttonWrapper}>
      <div className={classes.logoWrapper}>
        <img src={omijung} style={{ width: "200px" }} alt="logo" />
      </div>
      <div className={classes.keynoteBox}>
        <Tween
          from={{ opacity: 0, x: 20 }}
          stagger={0.2}
          ease="elastic.out(0.1, 0.1)"
        >
          <SplitChars
            wrapper={
              <div
                style={{
                  display: "inline-block",
                  fontSize: "1rem",

                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              />
            }
          >
            당신의 가장 따뜻한 저녁
          </SplitChars>
        </Tween>
      </div>
      <div className={classes.lineWrapper}>
        <div className={classes.fakeLine} />
        <div>
          <Typography variant="subtitle2" color="textSecondary">
            로그인
          </Typography>
        </div>
        <div className={classes.fakeLine} />
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
    </div>
  );
};

export default SocialLogin;
