import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 390,
    margin: theme.spacing(2),
    padding: 3,
    backgroundColor: "#b0bec5",
  },
  media: {
    height: 200,
  },
}));

function Media({ article }) {
  const onDelete = () => {
    axios.delete(`http://i5c207.p.ssafy.io/curation/post/${article.id}`);
  };
  const classes = useStyles();

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

  console.log("TEST", timeForToday(article.createDate));
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Ted talk"
              src={article.profileImage}
              style={{ marginLeft: "1" }}
            />

            <Typography>{article.user.nickname}</Typography>
          </div>
        }
        action={
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
              fontWeight: "bold",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {timeForToday(article.createDate)}
          </Typography>
        }
      />
      <Link to={`/articles/detail/${article.id}`}>
        <CardMedia className={classes.media} image={article.imagePath} />
      </Link>

      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {article.title}
        </Typography>
      </CardContent>
      <a href="/articles">
        <button onClick={() => onDelete(article.id)}>삭제임시</button>
      </a>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default Media;
