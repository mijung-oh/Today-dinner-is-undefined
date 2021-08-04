import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import { ArticleProps } from "lib/interfaces";
import { makeStyles, Theme } from "@material-ui/core";
import ArticleContainer from "@profiles/container/ArticleContainer";
import axios from "axios";
import { USER_CHECK_URL } from "@lib/constants";
import ProfileDrawer from "@profiles/components/ProfileDrawer";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: "10%",
    marginBottom: "10%",
  },
  imgContainer: {
    position: "relative",
    width: "100%",
  },
  backgroundImg: {
    borderRadius: "7% 7% 0 0",
  },
  profileImg: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    top: "65%",
    borderRadius: "50%",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "64px",
      height: "64px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "120px",
      height: "120px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "160px",
      height: "160px",
    },
  },
  followBtn: {
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
  whiteTip: {
    position: "absolute",
    top: "80%",
    width: "100%",
    height: "20%",
    backgroundColor: theme.palette.common.white,
    borderTopLeftRadius: "130px",
    borderTopRightRadius: "130px",
    border: "none",
    borderBottom: 0,
  },
  contextArea: {
    backgroundColor: theme.palette.common.white,
    width: "100%",
  },
  infoArea: {
    display: "flex",
    padding: "5% 0",
    justifyContent: "space-around",
  },
  infoText: {
    textAlign: "center",
    padding: "5% 5%",
    margin: "-1% 0%",
  },
  buttonArea: {
    display: "flex",
    padding: "5% 0",
    justifyContent: "space-around",
  },
  articleArea: {
    padding: "0% 5%",
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

interface paramsProps {
  nickname: string;
}
//TODO : 이메일 출력
const Profile: React.FC<RouteComponentProps<paramsProps>> = ({ match }) => {
  const nickname = match.params.nickname;
  const PROFILE_URL = `http://i5c207.p.ssafy.io:9000/curation/userInfo/${nickname}`;
  const [currentUserNickname, setCurrentUserNickname] = useState<string>("");
  const [fetchedProfileImg, setProfileImg] = useState<any>("");
  const [fetchedBgImg, setBgImg] = useState<any>("");
  const [fetchedFollowers, setFollowers] = useState<Array<string>>([]);
  const [fetchedFollowings, setFollowings] = useState<Array<string>>([]);
  const [fetchedIntroduction, setIntroduction] = useState<string>("");
  const [fetchedMyPagePostDtos, setMyPagePostDtos] = useState<
    Array<[ArticleProps]>
  >([]);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get(PROFILE_URL);
        console.log("fectched data", res.data);
        const {
          bgImg,
          followers,
          followings,
          introduction,
          myPagePostDtos,
          profileImg,
        } = res.data;
        setBgImg(bgImg);
        setFollowers(followers);
        setFollowings(followings);
        setIntroduction(introduction);
        setMyPagePostDtos(myPagePostDtos);
        setProfileImg(profileImg);
      } catch (err) {
        alert("존재하지 않는 사용자 페이지 "); // 여기에 이상한 사용자 있으면 404 페이지로 보내는 로직을
      }
    };
    const currentUser = async () => {
      const res = await axios.get(`${USER_CHECK_URL}`);
      const {
        data: { nickname },
      } = res;
      setCurrentUserNickname(nickname);
    };
    userInfo();
    currentUser();
  }, [PROFILE_URL]);

  const classes = useStyles();
  return (
    <section className={classes.container}>
      <div className={classes.imgContainer}>
        <div className={classes.whiteTip}></div>
        <img
          className={classes.profileImg}
          src={
            fetchedProfileImg
              ? fetchedProfileImg
              : "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
          }
          alt="profileImg"
        ></img>
        <div>
          <img
            className={classes.backgroundImg}
            width="100%"
            src={
              fetchedBgImg
                ? fetchedBgImg
                : "https://patoliyainfotech.com/wp-content/uploads/2019/10/one-year-of-react-native.png"
            }
            alt="backgroundImg"
          ></img>
        </div>
      </div>
      <div className={classes.contextArea}>
        <div>
          <div className={classes.infoText}>
            <h1>{nickname}</h1>
            <h3>
              {fetchedIntroduction ? fetchedIntroduction : "자기 소개가 없어요"}
            </h3>
          </div>
        </div>
        <div className={classes.buttonArea}>
          {/* TODO: 팔로우 버튼 등장 조건 .. 프로필 유저 !== 로그인 유저
          프로필 유저 === 로그인 유저 프로필 편집 
          */}
          {currentUserNickname === nickname ? (
            <ProfileDrawer
              nickname={nickname}
              profileImg={fetchedProfileImg}
              introduction={fetchedIntroduction}
              bgImg={fetchedBgImg}
            />
          ) : (
            <Button
              className={classes.followBtn}
              variant="outlined"
              color="primary"
            >
              팔로우
            </Button>
          )}
        </div>
        <div className={classes.infoArea}>
          <div className={classes.infoText}>
            <h4>{fetchedMyPagePostDtos.length}</h4>
            <p>게시글</p>
          </div>
          <div className={classes.infoText}>
            <h4>{fetchedFollowers.length}</h4>
            <p>팔로워</p>
          </div>
          <div className={classes.infoText}>
            <h4>{fetchedFollowings.length}</h4>
            <p>팔로잉</p>
          </div>
        </div>
        <hr style={{ width: "90%" }}></hr>
        <div className={classes.articleArea}>
          <h2 className={classes.title}>게시글</h2>
          <ArticleContainer
            fetchedMypagePostDtos={fetchedMyPagePostDtos}
          ></ArticleContainer>
        </div>
      </div>
    </section>
  );
};

export default Profile;
