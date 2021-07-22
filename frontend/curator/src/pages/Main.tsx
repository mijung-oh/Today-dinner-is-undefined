import React, { SyntheticEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
};
const onClickNaver = (e: any) => {
  console.log("Naver");
};
const onClickKakao = (e: any) => {
  console.log("Kakao");
};

interface MainProps {}

const Main: React.FC<MainProps> = (props) => {
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
