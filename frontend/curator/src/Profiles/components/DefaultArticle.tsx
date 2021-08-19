import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import nyancat from "@static/images/cat-nyan-cat.gif";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    padding: "10% 10%",
    marginBottom: "5%",
  },
  imgContainer: {
    maxWidth: "300px",
    maxHeight: "300px",
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
        <img src={nyancat} alt="other" style={{ width: "100%" }} />
      </div>
      <Typography variant="h5">아직 아무런 게시글이 없어요</Typography>
    </Paper>
  );
};

export default DefaultArticle;
