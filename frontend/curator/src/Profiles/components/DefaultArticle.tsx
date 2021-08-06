import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    padding: "10% 10%",
  },
  imgContainer: {
    maxWidth: "512px",
    maxHeight: "512px",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
}));

const DefaultArticle: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} elevation={3}>
      <div className={classes.imgContainer}>
        <img
          src="https://thumbs.gfycat.com/BouncyWelcomeGrassspider.webp"
          alt="other"
        />
      </div>
      <Typography variant="h5">아직 아무런 게시글이 없어요</Typography>
    </Paper>
  );
};

export default DefaultArticle;
