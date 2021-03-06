import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  ChangeEvent,
} from "react";
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
import axios from "axios";
import { NICKNAME_CHECK_URL } from "@lib/constants";
import defaultProfileImage from "@static/images/default-profile.jpg";
import defaultBG from "@static/images/default-bg.png";

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
      height: "68px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "186px",
      height: "70px",
    },
  },
  imgContainer: {
    margin: "1px auto",
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
      padding: "3% 3% 3% 3%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "130px",
      height: "130px",
      padding: "3% 1% 1% 1%",
    },
    "& img": {
      width: "100%",
    },
  },
  backgroundImgContainer: {
    margin: "0 auto",
    padding: "10% 10% 3% 10%",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "78px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "128px",
      padding: "1% 1% 1% 1%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "172px",
      padding: "1% 1% 1% 1%",
    },
    "& img": {
      width: "100%",
    },
  },
  contextContainer: {
    padding: "5% 5% 10% 5%",
    [theme.breakpoints.between("md", "lg")]: {
      padding: "5% 5% 5% 5%",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "3% 10% 3% 10%",
    },
  },
  buttonContainer: {
    margin: "0 auto",
    display: "flex",
    visibility: "visible",
    justifyContent: "space-around",
  },
  disappear: {
    display: "none",
    opacity: 0,
  },
}));

interface profileProps {
  nickname: string;
  profileImg: any;
  bgImg: any;
  introduction: string;
}

const ProfileDrawer: React.FC<profileProps> = (props) => {
  const classes = useStyles();
  const [state, setState] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [profileImg, setProfileImg] = useState<any>(undefined);
  const [bgImg, setBgImg] = useState<any>(undefined);
  const [triggerCheck, setTriggerCheck] = useState<Boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<Boolean>(false);
  const [showButtons, setShowButtons] = useState<Boolean>(true);
  const [bgImgFile, setBGImgFile] = useState<any>(undefined);
  const [profileImgFile, setProfileImgFile] = useState<any>(undefined);

  console.log("I am props!", props);
  // props??? ?????? ????????? ????????????????????? ??? ?????? , ??????????????? created ??? ??? set ?????????
  // ???????????? useState(props.)?????? ????????? ?????? ??? ???????????? ????????????.
  useEffect(() => {
    setNickName(props.nickname);
    setIntroduction(props.introduction);
    setProfileImg(props.profileImg);
    setBgImg(props.bgImg);
  }, [props.bgImg, props.introduction, props.nickname, props.profileImg]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log("ggg");
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const profileInput = useRef<HTMLInputElement>(null);
  const bgInput = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: any) => {
    const formData = new FormData();
    formData.append("nickname", nickName);
    formData.append("introduction", introduction);
    formData.append(
      "profileImg",
      new Blob([profileImgFile], { type: "image/png" })
    );
    formData.append("bgImg", new Blob([bgImgFile], { type: "image/png" }));

    const PUT_URL = "http://i5c207.p.ssafy.io:9000/curation/userInfo";
    try {
      await axios.put(PUT_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(res.data);
      setState(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onClickProfileInput = (e: MouseEvent) => {
    if (profileInput.current !== null) {
      profileInput.current.click();
    }
  };

  const profileChange = (e: ChangeEvent) => {
    if (profileInput.current !== null) {
      const adjustedProfile: File | undefined = profileInput.current.files?.[0];
      // console.log("adjustP", adjustedProfile);
      if (adjustedProfile !== undefined) {
        setProfileImgFile(adjustedProfile);
        const reader = new FileReader();
        reader.onloadend = (event: any) => {
          const readData = event.currentTarget.result as string;
          setProfileImg(readData);
        };
        reader.readAsDataURL(adjustedProfile);
      }
    }
  };

  const onClickbgInput = (e: MouseEvent) => {
    if (bgInput.current !== null) {
      bgInput.current.click();
    }
  };
  const bgChange = (e: ChangeEvent) => {
    if (bgInput.current !== null) {
      const adjustedBG: File | undefined = bgInput.current.files?.[0];
      if (adjustedBG !== undefined) {
        setBGImgFile(adjustedBG);
        const reader = new FileReader();
        reader.onloadend = (event: any) => {
          const readData = event.currentTarget.result as string;
          setBgImg(readData);
        };
        reader.readAsDataURL(adjustedBG);
      }
    }
  };

  const nickNameChange = (e: any) => {
    setNickName(e.target.value);
    setTriggerCheck(true);
    setShowButtons(false);
  };
  const nickNameDuplicateCheck = async () => {
    const config = { withCredentials: true };
    const res = await axios.get(NICKNAME_CHECK_URL(nickName), config); // ?????? ????????? ?????? ?????? ????????????
    setIsDuplicate(res.data);
    setTriggerCheck(false);

    if (isDuplicate) {
      // ??????????????????
      setShowButtons(false);
    } else {
      setShowButtons(true);
      // setTriggerCheck(true);
    }
    // console.log(res);
  };
  const introductionChange = (e: any) => {
    setIntroduction(e.target.value);
  };

  const list = () => (
    <div role="presentation">
      <input
        type="file"
        id="profileInput"
        ref={profileInput}
        style={{ display: "none" }}
        onChange={profileChange}
      />
      <input
        type="file"
        id="bgInput"
        ref={bgInput}
        style={{ display: "none" }}
        onChange={bgChange}
      />
      <Typography className={classes.title} align="justify" variant="h5">
        ????????? ??????
      </Typography>
      <div className={classes.imgContainer}>
        <img
          style={{ borderRadius: "50%", width: "100%", height: "100%" }}
          src={profileImg ? profileImg : defaultProfileImage}
          alt="????????????"
        />
      </div>
      <Typography
        variant="subtitle1"
        component="p"
        align="center"
        color="primary"
        onClick={onClickProfileInput}
      >
        ????????? ?????? ??????
      </Typography>
      <div className={classes.backgroundImgContainer}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={bgImg ? bgImg : defaultBG}
          alt="????????????"
        />
      </div>
      <Typography
        variant="subtitle1"
        component="p"
        align="center"
        color="primary"
        onClick={onClickbgInput}
      >
        ??????????????? ????????? ??????
      </Typography>
      <div className={classes.contextContainer}>
        <TextField
          id="input-nickname"
          label="?????????"
          value={nickName}
          onChange={nickNameChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {triggerCheck ? (
                  <Button color="primary" onClick={nickNameDuplicateCheck}>
                    ?????? ??????
                  </Button>
                ) : (
                  <div></div>
                )}
              </InputAdornment>
            ),
          }}
        />
        {triggerCheck ? (
          isDuplicate ? (
            <Typography variant="subtitle2" color="secondary">
              ????????? ??????????????????.
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="secondary">
              ????????? ?????? ????????? ????????????
            </Typography>
          )
        ) : (
          <Typography variant="subtitle2" color="primary">
            ??????????????? ??????????????????.
          </Typography>
        )}
        <TextField
          id="input-introduction"
          label="????????????"
          value={introduction}
          onChange={introductionChange}
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
      <div
        className={
          showButtons
            ? `${classes.buttonContainer}`
            : ` ${classes.buttonContainer} ${classes.disappear}`
        }
      >
        <IconButton color="primary" onClick={handleSubmit}>
          <CheckIcon />
        </IconButton>
        <IconButton color="secondary" onClick={toggleDrawer(false)}>
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
        ????????? ??????
      </Button>
      <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};
export default ProfileDrawer;
