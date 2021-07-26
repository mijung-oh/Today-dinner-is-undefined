import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../modules/clientLogin";
import { codeExtractor } from "@components/lib/helper";
import { googleURL } from "@components/lib/constants";

const useStyles = makeStyles({
  Container: {
    textAlign: "center",
    // padding: "5% 5%",
    width: "100%",
  },
  ImageBox: {
    width: "320px",
    height: "320px",
    margin: "3% auto",
    // position: "relative",
  },
  ButtonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const onClickGoogle = (e: any) => {
  console.log("Google");
  window.location.href = `${googleURL}`;
};
const onClickNaver = (e: any) => {
  console.log("Naver");
};
const onClickKakao = (e: any) => {
  console.log("Kakao");
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
          const { name, email } = userData;
          dispatch(getUserInfo(name, email));
          localStorage.setItem("userData", JSON.stringify(userData));
          history.push("/");
        });
      } catch (err) {
        console.log("err", err);
      }
    }
  }, [dispatch, history]);

  const classes = useStyles(props);
  return (
    <section className={classes.Container}>
      <div className={classes.ImageBox}>
        <img
          src="https://i.scdn.co/image/ab67706c0000bebb56c618ce8634a34df69eea63"
          alt="placeholder"
          width="100%"
          height="100%"
        />
      </div>

      <Button variant="outlined" name="google" onClick={onClickGoogle}>
        구글로 로그인
      </Button>
      <br></br>
      <Button variant="outlined" name="naver" onClick={onClickNaver}>
        네이버로 로그인
      </Button>
      <br></br>
      <Button variant="outlined" name="kakao" onClick={onClickKakao}>
        카카오톡으로 로그인
      </Button>
      {/* </div> */}
      <p>TODO: 각 회사에 맞는 버튼들로 교체</p>
    </section>
  );
};

export default Main;
