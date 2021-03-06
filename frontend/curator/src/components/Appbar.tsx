import {
  AppBar,
  Fab,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../modules/clientLogin";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StyleIcon from "@material-ui/icons/Style";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "modules";
import { getUserNickname } from "@lib/helper";
import Badge from "@material-ui/core/Badge";
import { db } from "../fbInstance";
import Modal from "@material-ui/core/Modal";
import { CHECKOUT_URL } from "@lib/constants";
import { v4 as uuidv4 } from "uuid";
import nyanCat from "@static/images/cat-nyan-cat.gif";
import omijungClear from "@static/images/omijung-clear.png";
import { LOGOUT_URL } from "@lib/constants";

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    "z-index": "100",
  },
  bar: {
    backgroundColor: "#EA4C4C", // 여기서 색깔 바꿈
  },
  title: {
    flexGrow: 1,
    display: "block",
  },

  paper: {
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      width: 150,
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: 200,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 350,
    },
    [theme.breakpoints.up("lg")]: {
      width: 750,
    },
    // top: "30%",
    fontSize: "0.785rem",
    minHeight: "300px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

interface paramsProps {
  nickname: string;
}

const Appbar: React.FC<RouteComponentProps<paramsProps>> = ({
  history,
  location,
  match,
}) => {
  useEffect(() => {
    const fetchUserNickname = async () => {
      const nickname = await getUserNickname();
      setUserNickname(nickname);
      db.collection("Follow")
        .doc(nickname)
        .onSnapshot((doc) => {
          const followers = doc.data()?.follower;
          setalertCount(followers);
        });
    };
    fetchUserNickname();
  }, []);

  const classes = useStyles();
  // const nickname = useSelector(
  //   (state: RootState) => state.clientLogin.nickname
  // );
  const [alertCount, setalertCount] = useState<Array<string | undefined>>([]);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<any>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string | undefined>("");
  const [postId, setPostId] = useState("");
  const IdCheck = async () => {
    axios.get("http://i5c207.p.ssafy.io/curation/post/list").then((res) => {
      let post_id = res.data[res.data.length - 1].id;
      setPostId(post_id);
    });
  };
  IdCheck();
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function ScrollTop(props: any) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const moveTop = (event: any) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={moveTop} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

  const pushProfile = async (event: any) => {
    const nickname = await getUserNickname();
    history.push(`/profile/${nickname}`);
  };
  const pushRecipe = (event: any) => {
    history.push("/recipe");
  };
  const logout = async () => {
    await axios.get(LOGOUT_URL);
    const name = "";
    const email = "";
    const nickname = "";
    dispatch(getUserInfo(name, email, nickname));
    history.push("/");
  };

  const clearAlertOnClick = (userNickname: any, target: any) => {
    const data = {
      user: userNickname,
      target: target,
    };
    const config = {
      withCredentials: true,
    };
    axios.post(CHECKOUT_URL, data, config);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        to={{
          pathname: "/articles/create",
          state: {
            postId: postId,
            nickname: userNickname,
          },
        }}
        style={{ color: "black", textDecoration: "none" }}
      >
        <MenuItem>
          <IconButton color="inherit">
            <CreateIcon />
          </IconButton>
          <p>게시글 작성</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={pushRecipe}>
        <IconButton color="inherit">
          <StyleIcon />
        </IconButton>
        <p>전체 레시피</p>
      </MenuItem>
      <MenuItem onClick={handleOpen}>
        <IconButton color="inherit">
          <Badge
            badgeContent={alertCount ? alertCount.length : 0}
            color="primary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>알림</p>
      </MenuItem>
      <MenuItem onClick={pushProfile}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>내 프로필</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>로그아웃</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.paper}>
          <h2>미확인 알람들 </h2>
          <hr />

          {alertCount ? (
            alertCount.length > 0 ? (
              alertCount.map((data) => {
                return (
                  <p
                    onClick={() => clearAlertOnClick(userNickname, data)}
                    key={uuidv4()}
                  >
                    {data}님이 팔로우 중!
                  </p>
                );
              })
            ) : (
              <div style={{ background: "#2c", borderRadius: "15px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={nyanCat} alt="nyancat gif" />
                </div>
                <Typography
                  align="center"
                  variant="h5"
                  style={{ color: "white" }}
                >
                  새로운 알림이 없어요
                </Typography>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </Modal>
      <AppBar className={classes.bar}>
        <Toolbar>
          <div className={classes.title}>
            <div
              style={{ display: "flex", alignItems: "center", height: "60px" }}
            >
              <img
                src={omijungClear}
                style={{ height: "100%" }}
                alt="오미정 로고"
              ></img>
              <div style={{ marginLeft: "10px", display: "inline-block" }}>
                오늘 저녁은 미정
              </div>
            </div>
          </div>

          <div className={classes.sectionDesktop}>
            <Link
              to={{
                pathname: "/articles/create",
                state: {
                  postId: postId,
                  nickname: userNickname,
                },
              }}
              style={{ color: "white" }}
            >
              <IconButton color="inherit">
                <CreateIcon />
              </IconButton>
            </Link>
            <IconButton color="inherit" onClick={pushRecipe}>
              <StyleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleOpen}>
              <Badge
                badgeContent={alertCount ? alertCount.length : 0}
                color="primary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={pushProfile} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default withRouter(Appbar);
