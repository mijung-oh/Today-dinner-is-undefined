import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function RecipePage({ post, loading }) {
  const classes = useStyles();
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const randomSize = Math.floor(Math.random() * 80 + 400);
  console.log(randomSize);
  return (
    <>
      <Button
        className={classes.root}
        variant="contained"
        href={`recipe/detail/${post.recipe_ID}`}
      >
        <img src={post.img_URL} width="300px" height="300px" />
      </Button>
    </>
  );
}

export default RecipePage;
