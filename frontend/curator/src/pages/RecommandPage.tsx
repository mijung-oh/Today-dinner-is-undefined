import React, { MouseEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import acorn from "@recommand/static/image/acorn.svg";
import beef from "@recommand/static/image/beef.svg";
import carrot from "@recommand/static/image/carrot.svg";
import chickenBreast from "@recommand/static/image/chickenBreast.svg";
import chicken from "@recommand/static/image/chicken.svg";
import chives from "@recommand/static/image/chives.svg";
import eggs from "@recommand/static/image/eggs.svg";
import greenOnion from "@recommand/static/image/greenOnion.svg";
import hairtail from "@recommand/static/image/hairtail.svg";
import jelly from "@recommand/static/image/jelly.svg";
import mackerel from "@recommand/static/image/mackerel.svg";
import noodles from "@recommand/static/image/noodles.svg";
import nori from "@recommand/static/image/nori.svg";
import octopus from "@recommand/static/image/octopus.svg";
import paprika from "@recommand/static/image/paprika.svg";
import pork from "@recommand/static/image/pork.svg";
import potato from "@recommand/static/image/potato.svg";
import pumpkin from "@recommand/static/image/pumpkin.svg";
import ramen from "@recommand/static/image/ramen.svg";
import riceCake from "@recommand/static/image/riceCake.png";
import sesameLeaf from "@recommand/static/image/sesameLeaf.svg";
import vegetables from "@recommand/static/image/vegetables.svg";
import wheat from "@recommand/static/image/wheat.svg";
import { Paper, Avatar, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Ingredient } from "@lib/interfaces";
import { findRecommandFood } from "@lib/helper";

const imageObject = {
  acorn,
  beef,
  carrot,
  chickenBreast,
  chicken,
  chives,
  eggs,
  greenOnion,
  hairtail,
  jelly,
  mackerel,
  noodles,
  nori,
  octopus,
  paprika,
  pork,
  potato,
  pumpkin,
  ramen,
  riceCake,
  sesameLeaf,
  vegetables,
  wheat,
};

const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    textAlign: "center",
    margin: "5% 3% 15% 3%",
    padding: "5%",
  },
  container: {
    padding: "5%",
  },
  ingredientChip: {
    margin: "2px 2px",
  },
  ingredientBox: {
    margin: "5% auto",
  },
  foodLegends: {
    textAlign: "left",
    padding: "5px 10px",
    borderRadius: "40px",
    backgroundColor: "#A1C45A",
  },
  foodFieldset: {
    border: `solid thin ${theme.palette.grey[400]}`,
    padding: "3% 3%",
  },
}));

const mainIngredientMappingList: Ingredient[] = [
  {
    name: "beef",
    korean: "소고기",
    alt: "소고기 아이콘",
  },
  {
    name: "pork",
    korean: "돼지고기",
    alt: "돼지고기 아이콘",
  },
  {
    name: "chicken",
    korean: "닭고기",
    alt: "닭고기 아이콘",
  },
  {
    name: "chickenBreast",
    korean: "닭가슴살",
    alt: "닭가슴살 아이콘",
  },
  {
    name: "riceCake",
    korean: "떡",
    alt: "떡 아이콘",
  },
  {
    name: "hairtail",
    korean: "갈치",
    alt: "갈치 아이콘",
  },
  {
    name: "pumpkin",
    korean: "단호박",
    alt: "단호박 아이콘",
  },
  {
    name: "paprika",
    korean: "파프리카",
    alt: "파프리카 아이콘",
  },
  {
    name: "ramen",
    korean: "라면",
    alt: "라면 아이콘",
  },
  {
    name: "acorn",
    korean: "도토리묵",
    alt: "도토리묵 아이콘",
  },
  {
    name: "wheat",
    korean: "밀가루",
    alt: "밀가루 아이콘",
  },
  {
    name: "octopus",
    korean: "낙지",
    alt: "낙지 아이콘",
  },
  {
    name: "mackerel",
    korean: "꽁치",
    alt: "꽁치 아이콘",
  },
  {
    name: "noodles",
    korean: "국수",
    alt: "국수 아이콘",
  },
  {
    name: "eggs",
    korean: "계란",
    alt: "계란 아이콘",
  },
];
const subIngredientMappingList: Ingredient[] = [
  {
    name: "greenOnion",
    korean: "파",
    alt: "파 아이콘",
  },
  {
    name: "potato",
    korean: "감자",
    alt: "감자 아이콘",
  },
  {
    name: "chives",
    korean: "갓",
    alt: "갓(채소) 아이콘",
  },
  {
    name: "nori",
    korean: "김",
    alt: "김(채소) 아이콘",
  },
  {
    name: "jelly",
    korean: "곤약",
    alt: "곤약 아이콘",
  },
  {
    name: "sesameLeaf",
    korean: "깻잎",
    alt: "깻잎 아이콘",
  },
  {
    name: "vegetables",
    korean: "모둠채소",
    alt: "모둠채소 아이콘",
  },
  {
    name: "carrot",
    korean: "당근",
    alt: "당근 아이콘",
  },
];

const RecommandPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Array<string | null>>([]);
  const [check, setCheck] = useState<Boolean>(false);

  // const history = useHistory();

  const toggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let checked = event.currentTarget.checked;
    setCheck(checked);
    console.log(check);
  };

  const toggleIngredient = (event: MouseEvent) => {
    event.preventDefault();
    let target = event.currentTarget;
    let item = target.childNodes?.[1];
    let v = item.textContent;
    if (ingredients.includes(v)) {
      ingredients.splice(ingredients.indexOf(v), 1);
      setIngredients([...ingredients]);
    } else {
      setIngredients([...ingredients, v]);
    }
  };

  const onSubmit = async () => {
    const data = {
      ingredients,
      check,
    };
    const config = {
      withCredentials: true,
    };
    findRecommandFood(data, config);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.rootContainer}>
      <h1>우리 집 냉장고에는??</h1>
      <Paper className={classes.container} elevation={3}>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend className={classes.foodLegends}>메인 재료로는</legend>
            {mainIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  className={classes.ingredientChip}
                  onClick={toggleIngredient}
                  key={uuidv4()}
                  style={{
                    backgroundColor: ` ${
                      ingredients.includes(item.korean) ? "red" : "#e0e0e0"
                    }`,
                  }}
                />
              );
            })}
          </fieldset>
        </section>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend className={classes.foodLegends}>서브 재료로는</legend>
            {subIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  className={classes.ingredientChip}
                  onClick={toggleIngredient}
                  clickable
                  key={uuidv4()}
                  style={{
                    backgroundColor: ` ${
                      ingredients.includes(item.korean) ? "#A1C45A" : "#e0e0e0"
                    }`,
                  }}
                />
              );
            })}
          </fieldset>
        </section>
      </Paper>
      <h1>가 있다!!</h1>

      <FormControlLabel
        control={<Checkbox name="seasoning" onChange={toggleCheck} />}
        labelPlacement="start"
        label="각종 양념장도 있다!"
      />
      <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
        메뉴 추천받기
      </Button>
    </Paper>
  );
};

export default RecommandPage;
