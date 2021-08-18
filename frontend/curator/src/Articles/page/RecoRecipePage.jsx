import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import "./translate.css";
import axios from "axios";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  roots: {
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
    backgroundColor: "00ff0000",
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
  // scroll: {
  //   minWidth: "450px",

  //   height: "80%;",
  //   overflow: "auto;",
  // },
  // "@global": {
  //   "*::-webkit-scrollbar": {
  //     width: "0.4em",
  //   },
  //   "*::-webkit-scrollbar-track": {
  //     "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
  //   },
  //   "*::-webkit-scrollbar-thumb": {
  //     backgroundColor: "rgba(0,0,0,.1)",
  //     outline: "1px solid slategrey",
  //   },
  // },
}));

function RecoRecipePage({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [check, setCheck] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const authLogin = async () => {
    const auth = await axios.get(
      "http://i5c207.p.ssafy.io:9000/curation/currentLogin/test"
    );
    if (auth.data.nickname === "") {
    }
    setUser(auth.data.nickname);
  };

  const userCheck = async () => {
    authLogin();
    const response = await axios.get(
      `http://i5c207.p.ssafy.io/curation/scrap/${article.recipe_ID}/userList`
    );
    const nickname = user;
    if (response.data.includes(nickname)) {
      setCheck(true);
    }
  };
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
    userCheck();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!recipe) return null;

  const onToScrap = async () => {
    authLogin();
    let formData = new FormData();

    formData.append("nickname", user);

    const response = await axios.post(
      `http://i5c207.p.ssafy.io/curation/scrap/${article.recipe_ID}`,
      formData,
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );

    setCheck(!check);
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
          width: "100%",
        }}
      ></div>
      <div className={classes.roots}>
        <Card>
          <h3
            style={{
              fontFamily: "'Poor Story', cursive",
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              margin: "10px",
            }}
          >
            ▪ {recipe.recipe_NM_KO} ▪
          </h3>
          <h4
            style={{
              fontFamily: "'Poor Story', cursive",
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              margin: "10px",
            }}
          >
            {recipe.sumry}
          </h4>
          <CardMedia
            className={classes.media}
            image={recipe.img_URL}
            title="Paella dish"
          />

          <CardActions disableSpacing>
            <IconButton onClick={onToScrap} aria-label="add to favorites">
              {check ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </CardActions>
          <div>
            <CardContent>
              <h3
                style={{
                  display: "flex",
                  text: "center",
                  height: "auto",
                  flexWrap: "wrap",
                  fontSize: "13px",
                  fontFamily: "'Poor Story', cursive",
                }}
              >
                {recipe.ingredients.map((item) => (
                  <p paragraph> ▪&nbsp;{item.irdnt_NM} &nbsp; </p>
                ))}
              </h3>
              <br />
              <div>
                <h2>요리 순서</h2>
                {recipe.process.map((item) => (
                  <Typography
                    style={{
                      fontSize: "14px",
                      maxHeight: "auto",
                      overflow: "auto",
                    }}
                  >
                    <h3 style={{ fontFamily: "'Poor Story', cursive" }}>
                      Step.{item.cooking_NO}
                    </h3>
                    <img
                      src={item.stre_STEP_IMAGE_URL}
                      style={{ width: "60%" }}
                    />
                    <p style={{ fontFamily: "'Poor Story', cursive" }}>
                      {item.cooking_DC}
                    </p>
                  </Typography>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RecoRecipePage;
