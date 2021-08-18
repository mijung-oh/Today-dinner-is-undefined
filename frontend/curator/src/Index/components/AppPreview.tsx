import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import cellphone from "@static/images/cellphone.png";
import castle from "@static/images/castle.jpg";
import numberone from "@Index/static/image/numberone.png";
import numbertwo from "@Index/static/image/numbertwo.png";
import numberthree from "@Index/static/image/numberthree.png";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginRight: "15%",
    display: "inline-block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  imageBox: {
    width: "100%",
    height: "100%",
    // margin: "3% 5%",
    display: "inline-block",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  cellphoneImg: {
    position: "absolute",
    width: "232px",
    height: "412px",
    top: "90px",
    left: "140px",
    opacity: "0",
    transition: `${theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    })}`,
  },
}));

const AppPreview: React.FC = () => {
  const [activeImg, setActiveImg] = useState<number>(0);
  //clear를 통해 언마운트 되었을때  카운터를 종료 시킨다. 없으면 값이 무진장 꼬인다
  useEffect(() => {
    let activate = setInterval(() => {
      setActiveImg(Math.ceil((activeImg + 1) % 3));
    }, 3000);
    return () => {
      clearInterval(activate);
    };
  }, [activeImg]);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.imageBox}>
        <img src={cellphone} alt="placeholder" width="100%" height="100%" />
        <img
          src={numberone}
          className={classes.cellphoneImg}
          style={activeImg === 0 ? { opacity: 1 } : undefined}
          alt="dd"
        />
        <img
          src={numbertwo}
          className={classes.cellphoneImg}
          style={activeImg === 1 ? { opacity: 1 } : undefined}
          alt="dd"
        />
        <img
          src={numberthree}
          className={classes.cellphoneImg}
          style={activeImg === 2 ? { opacity: 1 } : undefined}
          alt="dd"
        />
      </div>
    </div>
  );
};

export default AppPreview;
