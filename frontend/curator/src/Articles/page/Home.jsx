import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import "./translate.css";

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "'Poor Story', cursive",
  },
}));
function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

function Media({ article, user }) {
  const classes = useStyles();
  console.log("asdasdasd", user);
  const onDelete = (id) => {
    axios.delete(`http://i5c207.p.ssafy.io/curation/post/${id}`);
  };

  return (
    <Grid
      container
      wrap="wrap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "column",
        padding: "10px",
        width: "100%",
      }}
    >
      {article.map((item) => (
        <Box key={item.id} width={300} marginRight={3} my={4} py={5}>
          {item ? (
            <Link
              to={{
                pathname: `/articles/detail/${item.id}`,
                state: {
                  nickname: user,
                },
              }}
            >
              <img
                style={{
                  width: 300,
                  height: 370,
                  borderRadius: 10,
                }}
                src={item.imagePath}
              />
            </Link>
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}

          {item ? (
            <Box pr={2}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Avatar
                  alt="Ted talk"
                  src={item.profileImage}
                  style={{ marginLeft: "1" }}
                />
                <Typography
                  style={{
                    fontWeight: "bold",
                    marginLeft: "auto",
                    marginTop: "10px",
                    fontFamily: "'Poor Story', cursive",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  style={{
                    marginLeft: "auto",
                    marginTop: "10px",
                    color: "textSecondary",
                    fontFamily: "'Poor Story', cursive",
                  }}
                >
                  {timeForToday(item.createDate)}
                </Typography>
              </div>
              <Typography
                display="block"
                variant="caption"
                color="textSecondary"
                style={{ fontFamily: "'Poor Story', cursive" }}
              >
                {item.channel}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                style={{
                  fontFamily: "'Poor Story', cursive",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {`"${item.user.nickname}님의 레시피"`}
              </Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default Media;
