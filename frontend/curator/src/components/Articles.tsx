import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreIcon from "@material-ui/icons/More";
import "./Articles.scss";

const Articles: React.FC = () => {
  return (
    <Card className="test">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="게시글"
          image="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            테스트
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<ShareIcon />}>
          공유하기
        </Button>
        <Button size="small" color="primary" startIcon={<MoreIcon />}>
          더보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default Articles;
