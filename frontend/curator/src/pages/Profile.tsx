import React from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() =>
  createStyles({
    userDescriptionArea: {
      margin: "0 auto",
      padding: "2em 1px 1px 1px",
      height: "600px",
      backgroundColor: "#DBCBB8",
      // opacity: "0.5",
    },
  })
);

interface paramsProps {
  username: string;
}

const Profile: React.FC<RouteComponentProps<paramsProps>> = ({ match }) => {
  const classes = useStyles();
  console.log(match);
  console.log(match.params);
  console.log(window.innerWidth);
  const username = match.params.username;
  // const test:paramsProps = match.params;
  const baseWidth = window.innerWidth > 1232 ? 1232 : window.innerWidth * 0.9;
  // const baseWidth = window.innerWidth * 0.9;
  const diagonalWidth = baseWidth * 0.3;
  const boxWidth = baseWidth * 1;
  const imgAreaWidth = baseWidth * 1;
  const imgBorderWidth = baseWidth * 0.014;
  const shadowBorderWidth = baseWidth * 0.032;
  const profileImageRight = imgAreaWidth;
  const profileImageSize = diagonalWidth * 0.4;
  const upperHeight = baseWidth * 0.19;
  const imgAreaHeight = diagonalWidth + upperHeight;
  // const innerWidth = 123;
  console.log(window.innerWidth);
  console.log("inner", baseWidth);
  console.log("p", profileImageRight);

  const styles = {
    background: {
      position: "relative" as "relative",

      width: "0",
      height: `${upperHeight}px`,
      margin: "0 auto",
      borderBottom: `${diagonalWidth}px solid #FF1919`,
      borderLeft: `${imgAreaWidth}px solid transparent`,
      // boxShadow: `0px ${shadowBorderWidth}px #EB0101`,
    },
    image: {
      position: "absolute" as "absolute", // wtf
      right: "0",
      width: `${imgAreaWidth}px`,
      height: `${imgAreaHeight}px`,
    },
    profileImage: {
      position: "absolute" as "absolute", // wtf
      top: "200%",
      right: `${profileImageRight - baseWidth / 5}px`,
      width: `${profileImageSize}px`,
      height: `${profileImageSize}px`,
      // "z-index": "1", z-index 여기서 설정하거나, zIndex로 쓰면 콘솔에서 에러난다 뭐지
    },
  };

  return (
    <div>
      <h2>Profile</h2>
      <Box maxWidth={`${boxWidth}px`}>
        <div style={{ ...styles.background }}>
          <div style={{ ...styles.profileImage, zIndex: 2 }}>
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              style={{
                border: `${imgBorderWidth}px solid #FF1919`,
                borderRadius: "50%",
                padding: "0 0",
              }}
              width="100%"
              height="100%"
              alt="profileImage"
            ></img>
          </div>
          <div style={{ ...styles.image, zIndex: -1 }}>
            <img
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              alt="backgroundImage"
              width="100%"
              height="100%"
              // style={{ ...styles.image }}
            ></img>
          </div>
        </div>
        <div className={classes.userDescriptionArea}>
          <h2>{username}의 페이지입니다</h2>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
