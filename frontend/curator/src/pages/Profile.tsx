import React from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Articles from "@components/Articles";
import ArticleContainer from "@container/ArticleContainer";
import "./Profile.scss";
interface paramsProps {
  username: string;
}
//TODO : 이메일 출력
const Profile: React.FC<RouteComponentProps<paramsProps>> = ({ match }) => {
  const username = match.params.username;
  const baseWidth = window.innerWidth;
  return (
    <section className="container">
      <div className="imgContainer">
        <div className="test2"></div>
        <img
          className="profileImg"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="profileImg"
        ></img>
        <div>
          <img
            className="backgroundImg"
            width="100%"
            src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt="backgroundImg"
          ></img>
        </div>
      </div>
      <div className="contextArea">
        <div>
          <div className="userInfo">
            <h1>{username}</h1>

            <h3>한 줄 소개가 들어갈 예정입니다.</h3>
          </div>
        </div>
        <div className="buttonArea">
          <Button variant="outlined" color="primary">
            테스트
          </Button>
          <Button variant="outlined" color="primary">
            테스트
          </Button>
        </div>
        <div className="infoArea">
          <div className="infoText">
            <h5>42</h5>
            <p>게시글</p>
          </div>
          <div className="infoText">
            <h5>10.1k</h5>
            <p>팔로워</p>
          </div>
          <div className="infoText">
            <h5>23K</h5>
            <p>팔로잉</p>
          </div>
        </div>
        <hr></hr>
        <div className="articleArea">
          <h2 className="title">게시글</h2>
          <ArticleContainer></ArticleContainer>
        </div>
      </div>
    </section>
  );
};

export default Profile;
