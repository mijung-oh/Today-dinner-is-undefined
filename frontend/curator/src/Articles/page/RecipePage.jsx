import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import ButtonBase from "@material-ui/core/ButtonBase";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  roots: {
    maxWidth: 390,
  },
  media: {
    height: 0,
    paddingTop: "58%", // 16:9

    width: "100%",
    margin: "auto",
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
  header: {
    height: "20",
  },

  rootss: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

function RecipePage({ allRecipe }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [check, setCheck] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpen = () => {
    setOpen(true);
    const scrapStatus = async () => {
      const scrap = await axios.get(
        `http://i5c207.p.ssafy.io/curation/scrap/${allRecipe.recipe_ID}/userList`
      );
      const nickname = "오잉";
      if (scrap.data.includes(nickname)) {
        setCheck(true);
      }
    };
    scrapStatus();
  };

  const handleClose = () => {
    setOpen(false);
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
          `http://i5c207.p.ssafy.io/curation/recipe/getRecipeDetail/${allRecipe.recipe_ID}`
        );

        setRecipe(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchRecipe();
    return () => setLoading(false);
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!recipe) return null;
  const onToScrap = async () => {
    let formData = new FormData();

    formData.append("nickname", "오잉");

    const response = await axios.post(
      `http://i5c207.p.ssafy.io/curation/scrap/${allRecipe.recipe_ID}`,
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
    <>
      <>
        <ButtonBase
          onClick={handleOpen}
          focusRipple
          key={allRecipe.recipe_ID}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: "400px",
            height: "250px",
            margin: "10px",

            // outline: "none",
            // boxShadow: "none",
            // backgroundColor: "white",
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${allRecipe.img_URL})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {allRecipe.recipe_NM_KO}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card className={classes.roots}>
              <CardHeader
                className={classes.header}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img src={allRecipe.img_URL} alt="" />
                  </Avatar>
                }
                title={allRecipe.recipe_NM_KO}
                subheader={allRecipe.sumry}
              />
              <CardMedia
                className={classes.media}
                image={allRecipe.img_URL}
                title="Paella dish"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={onToScrap} aria-label="add to favorites">
                  {check ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      text: "center",
                      height: "auto",
                      flexWrap: "wrap",
                      fontSize: "13px",
                    }}
                  >
                    {recipe.ingredients.map((item) => (
                      <p paragraph> ▪&nbsp;{item.irdnt_NM} &nbsp; </p>
                    ))}
                  </div>
                  <br />
                  {recipe.process.map((item) => (
                    <Typography
                      style={{
                        fontSize: "14px",
                        maxHeight: "auto",
                        overflow: "auto",
                      }}
                    >
                      {item.cooking_DC}
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default RecipePage;
