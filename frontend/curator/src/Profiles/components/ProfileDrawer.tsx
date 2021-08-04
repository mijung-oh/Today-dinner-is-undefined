import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Typography, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: "bold",
    paddingLeft: "3%",
    paddingTop: "1%",
    backgroundColor: theme.palette.grey[300],
  },
  editBtn: {
    "& span": {
      fontSize: "1rem",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "120px",
      height: "48px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "148px",
      height: "64px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "164px",
      height: "82px",
    },
  },
  imgContainer: {
    margin: "0 auto",
    padding: "10% 10% 3% 10%",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "48px",
      height: "48px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "78px",
      height: "78px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "128px",
      height: "128px",
    },
    "& img": {
      width: "100%",
      borderRadius: "50%",
    },
  },
  contextContainer: {
    padding: "5% 5% 10% 5%",
  },
  buttonContainer: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
  },
}));

interface profileProps {
  nickname: string;
  profileImg: any;
  introduction: string;
  bgImg: any;
}

const ProfileDrawer: React.FC<profileProps> = (props) => {
  const classes = useStyles();
  const [state, setState] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <div role="presentation">
      <Typography className={classes.title} align="justify" variant="h5">
        프로필 편집
      </Typography>
      <div className={classes.imgContainer}>
        <img
          src={
            props.profileImg
              ? props.profileImg
              : "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
          }
          alt=""
        />
      </div>
      <Typography
        variant="subtitle1"
        component="p"
        align="center"
        color="primary"
      >
        프로필 사진 변경
      </Typography>
      <div className={classes.contextContainer}>
        <TextField
          id="input-nickname"
          label="닉네임"
          value={props.nickname}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="input-introduction"
          label="자기소개"
          value={props.introduction}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ModeCommentIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Divider />
      <div className={classes.buttonContainer}>
        <IconButton color="primary">
          <CheckIcon />
        </IconButton>
        <IconButton color="secondary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        className={classes.editBtn}
        variant="contained"
        onClick={toggleDrawer(true)}
      >
        프로필 수정
      </Button>
      <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};
export default ProfileDrawer;
