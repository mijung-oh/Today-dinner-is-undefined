import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";

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
  var url =
    "https://accounts.google.com/o/oauth2/auth?" +
    "client_id=5927178749-au1h5ohkehsiq21enpd5l5pl0scnkp03.apps.googleusercontent.com" +
    "&redirect_uri=http://127.0.0.1:3000/" +
    "&response_type=code" +
    "&scope=email%20profile%20openid" +
    "&access_type=offline";
  window.location.href = `${url}`;
};
const onClickNaver = (e: any) => {
  console.log("Naver");
};
const onClickKakao = (e: any) => {
  console.log("Kakao");
};

interface MainProps {
  code: string;
}

const Main: React.FC<MainProps> = (props) => {
  useEffect(() => {
    const test = window.location.href;
    if (test.includes("code")) {
      console.log(test);
      const regex = /code=[0-9%A-Za-z_-]*/g;
      const code = test.match(regex);
      console.log("code", code);
      const trimmedCode = code?.join();
      console.log("trimmed", trimmedCode);
      const onGoCode = trimmedCode?.substring(5);
      console.log("onGoCode", onGoCode);
      const LOGIN_URL =
        "http://127.0.0.1:9000/curation/google/auth?code=" + onGoCode;
      const config = {
        withCredentials: true,
        // params: {
        //   code: onGoCode,
        // },
      };
      try {
        const res = axios.get(LOGIN_URL, config).then((res) => {
          console.log("res", res.data);
          const userData = res.data.response;
          localStorage.setItem("userData", JSON.stringify(userData));
          window.location.href = "/";
        });
      } catch (err) {
        console.log("err", err);
      }
    }
  }, []);
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
      {/* <div className={classes.ButtonBox}> */}
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
