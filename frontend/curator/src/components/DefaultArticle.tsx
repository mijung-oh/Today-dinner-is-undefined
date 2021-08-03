import React from "react";
import "./DefaultArticle.scss";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const DefaultArticle: React.FC = () => {
  return (
    <Paper className="defaultArticle--Container" elevation={3}>
      <div className="defaultArticle--imgContainer">
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
