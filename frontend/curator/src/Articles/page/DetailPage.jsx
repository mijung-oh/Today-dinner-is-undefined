import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  roots: {
    // maxWidth: ,
    display: "flex",
    justifyContent: "center",
    maxWidth: "2600px",
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
    backgroundColor: "#00ff0000",
  },
  root: {
    maxWidth: 1000,
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
    height: 500,
    display: "block",
    maxWidth: 2500,
    overflow: "hidden",
    width: "100%",
  },
}));

function DetailPage({ article, onDelete, user, currentUser }) {
  const [check, setCheck] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = article.imagePath.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const userCheck = async () => {
    const response = await axios.get(
      `http://i5c207.p.ssafy.io/curation/like/${article.id}/list`
    );
    const users = user;

    {
      response.data.map((item) =>
        item.nickname.includes(users) ? setCheck(true) : setCheck(false)
      );
    }
  };
  userCheck();
  const userLike = async () => {
    const response = await axios.post(
      `http://i5c207.p.ssafy.io/curation/like/${article.id}/?userNickname=${user}`
    );
    userCheck();
    setCheck(!check);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: "5%",
        padding: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "2000px",
        }}
      ></div>
      <div className={classes.roots}>
        <Card style={{ width: "70%", padding: "0" }}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            🥨{article.title}🥨
          </h1>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={article.profileImage} style={{ width: "100%" }} />
              </Avatar>
            }
            subheader={article.user.nickname}
          />
          <div>
            <div className={classes.root} style={{ margin: "auto" }}>
              <div
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {article.imagePath.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <img
                        className={classes.img}
                        src={step}
                        style={{ margin: "auto" }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
              <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </div>
          </div>
          <CardActions disableSpacing>
            {article.user.nickname === user ? (
              <IconButton aria-label="add to favorites" onClick={userLike}>
                {check ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            ) : null}
            <Link
              to={{
                pathname: `/update/${article.id}`,
                state: {
                  title: article.title,
                  description: article.description,
                  ingredients: article.ingredients,
                  imagePath: article.imagePath,
                },
              }}
            >
              <IconButton aria-label="add to favorites">
                {article.user.nickname === user ? <EditIcon /> : null}
              </IconButton>
            </Link>
            <IconButton aria-label="delete" onClick={onDelete}>
              {article.user.nickname === user ? <DeleteForeverIcon /> : null}
            </IconButton>
          </CardActions>
          <h4 style={{ display: "flex", justifyContent: "center" }}>
            Ingredients: {article.ingredients}
          </h4>
          <Typography
            style={{
              margin: "35px",
              textAlign: "center",
            }}
          >
            Recipe <br />
            {article.description}
          </Typography>
          <CommentList
            post_id={article.id}
            currentUser={currentUser}
            // comment={comment}
            user={user}
          />
        </Card>
      </div>
    </div>
  );
}

export default DetailPage;
