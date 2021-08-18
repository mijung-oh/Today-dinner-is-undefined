import {
  AppBar,
  Fab,
  InputBase,
  alpha,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      display: "block",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
    top: "30%",
    fontSize: "0.785rem",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
    // const getNewAlert = async () => {
    //   const test = await countNewAlert();
    //   setalertCount(test);
    // };
    // getNewAlert();
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
    setWindowInnerWidth(window.innerWidth);
  }, []);

  const classes = useStyles();
  const nickname = useSelector(
    (state: RootState) => state.clientLogin.nickname
  );
  const [alertCount, setalertCount] = useState<Array<string | undefined>>([]);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<any>(null);
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string | undefined>("");
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

  const pushProfile = (event: any) => {
    history.push(`/profile/${nickname}`);
  };

  const test = (userNickname: any, target: any) => {
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
      <MenuItem>
        <IconButton color="inherit">
          <CreateIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleOpen}>
        <IconButton color="inherit">
          <Badge badgeContent={alertCount.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
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
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Log out</p>
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

          {alertCount.length > 0 ? (
            alertCount.map((data) => {
              return (
                <p onClick={() => test(userNickname, data)} key={uuidv4()}>
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
          )}
        </div>
      </Modal>
      <AppBar className={classes.bar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/">프로젝트</Link>
          </Typography>
          <Link to="/test">테스트 페이지</Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <CreateIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleOpen}>
              <Badge badgeContent={alertCount.length} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={pushProfile} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit">
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
