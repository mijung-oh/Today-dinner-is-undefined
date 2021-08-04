import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { humanizeTime } from "@lib/helper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreIcon from "@material-ui/icons/More";
import { ArticleProps } from "@lib/interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  cardWrapper: {
    maxWidth: "300px",
    margin: "5% 0",
  },
}));

const Articles: React.FC<ArticleProps> = (props) => {
  const [humanTime, setHumanTime] = useState<string>("");

  const launchTime = () => {
    setInterval(() => {
      let Htime = humanizeTime(props.createDate);
      setHumanTime(Htime);
    }, 1000);
  };
  useEffect(() => {
    launchTime();
  });
  // 카드에 쓸 수 있는 것
  // description : 게시글 내용
  // imagePath : 사진 url
  // ingredient : 요리에 들어간 재료
  const classes = useStyles();
  return (
    <Card className={classes.cardWrapper}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="게시글"
          image={
            props.imagePaths.length // 수정 필요. 현재 imagePath가 배열 형태라...이거 어떻게 자료 넘어오는 지 협상 필요
              ? props.imagePaths
              : "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="p"
            color="textSecondary"
            align="right"
            gutterBottom
          >
            {humanTime}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary" startIcon={<ShareIcon />}>
          공유하기
        </Button>
        <Button size="large" color="primary" startIcon={<MoreIcon />}>
          더보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default Articles;
