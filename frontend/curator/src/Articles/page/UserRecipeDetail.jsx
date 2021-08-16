import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import back from "../components/images/qq.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  roots: {
    // maxWidth: ,
    display: "flex",
    justifyContent: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "50%",
    display: "block",
    maxWidth: "50%",
    overflow: "hidden",
    width: "100%",
  },
}));

function UserRecipeDetail({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setRecipe(null);
        // setLoading(true);
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/recipe/getRecipeDetail/${article.recipe_ID}`
        );
        setRecipe(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!recipe) return null;
  const onToScrap = async () => {
    let formData = new FormData();

    formData.append("nickname", "오잉");

    const response = await axios.post(
      `http://i5c207.p.ssafy.io/curation/scrap/${article.recipe_ID}`,
      formData,
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
    const btnChange = response.data;
    if (btnChange === "delete success") {
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "3%",
        padding: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div className={classes.roots}>
        <Card style={{ width: "70%", padding: "2px" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            🍚{article.recipe_NM_KO}🍚
          </h1>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={article.img_URL} style={{ width: "100%" }} />
              </Avatar>
            }
            title={article.sumry}
          />
          <CardMedia
            className={classes.media}
            image={article.img_URL}
            title="Paella dish"
            style={{ width: "100%" }}
          />

          <CardActions disableSpacing>
            <a href="/userScrap">
              <IconButton onClick={onToScrap} aria-label="add to favorites">
                <DeleteForeverIcon />
              </IconButton>
            </a>
          </CardActions>

          <CardContent>
            <div
              style={{
                display: "flex",
                text: "center",
                width: "100%",
                // flexWrap: "wrap",
                fontSize: "13px",
              }}
            >
              {recipe.ingredients.map((item) => (
                <p> ▪&nbsp;{item.irdnt_NM} &nbsp; </p>
              ))}
            </div>
            <br />
            {recipe.process.map((item) => (
              <Typography
                style={{
                  fontSize: "14px",
                  margin: "auto",
                  overflow: "auto",
                }}
              >
                {item.cooking_DC}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserRecipeDetail;
