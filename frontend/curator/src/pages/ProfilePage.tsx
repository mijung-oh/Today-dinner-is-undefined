import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import { ArticleProps } from "lib/interfaces";
import ArticleContainer from "@profiles/container/ArticleContainer";
import "./ProfilePage.scss";
import axios from "axios";
interface paramsProps {
  nickname: string;
}
//TODO : 이메일 출력
const Profile: React.FC<RouteComponentProps<paramsProps>> = ({ match }) => {
  const nickname = match.params.nickname;
  const PROFILE_URL = `http://i5c207.p.ssafy.io:9000/curation/userInfo/${nickname}`;

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
        alert("야 너 누구야"); // 여기에 이상한 사용자 있으면 404 페이지로 보내는 로직을
      }
    };
    userInfo();
  }, [PROFILE_URL]);
  return (
    <section className="container">
      <div className="imgContainer">
        <div className="whiteTip"></div>
        <div className="profileImgContainer">
          <img
            className="profileImg"
            src={
              fetchedProfileImg
                ? fetchedProfileImg
                : "https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
            }
            alt="profileImg"
          ></img>
        </div>
        <div>
          <img
            className="backgroundImg"
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
      <div className="contextArea">
        <div>
          <div className="userInfo">
            <h1>{nickname}</h1>

            <h3>
              {fetchedIntroduction ? fetchedIntroduction : "자기 소개가 없어요"}
            </h3>
          </div>
        </div>
        <div className="buttonArea">
          {/* TODO: 팔로우 버튼 등장 조건 .. 프로필 유저 !== 로그인 유저
          프로필 유저 === 로그인 유저 프로필 편집 
          */}
          <Button className="follow--btn" variant="outlined" color="primary">
            팔로우
          </Button>
        </div>
        <div className="infoArea">
          <div className="infoText">
            <h4>{fetchedMyPagePostDtos.length}</h4>
            <p>게시글</p>
          </div>
          <div className="infoText">
            <h4>{fetchedFollowers.length}</h4>
            <p>팔로워</p>
          </div>
          <div className="infoText">
            <h4>{fetchedFollowings.length}</h4>
            <p>팔로잉</p>
          </div>
        </div>
        <hr></hr>
        <div className="articleArea">
          <h2 className="title">게시글</h2>
          <ArticleContainer
            fetchedMypagePostDtos={fetchedMyPagePostDtos}
          ></ArticleContainer>
        </div>
      </div>
    </section>
  );
};

export default Profile;
