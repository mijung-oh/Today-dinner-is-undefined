import React, { MouseEvent } from "react";
// import Paper from "@material-ui/core/Paper";
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
  },
  foodFieldset: {
    border: `solid thin ${theme.palette.grey[400]}`,
    padding: "3% 3%",
  },
}));

interface Ingredient {
  name:
    | "acorn"
    | "beef"
    | "carrot"
    | "chickenBreast"
    | "chicken"
    | "chives"
    | "eggs"
    | "greenOnion"
    | "hairtail"
    | "jelly"
    | "mackerel"
    | "noodles"
    | "nori"
    | "octopus"
    | "paprika"
    | "pork"
    | "potato"
    | "pumpkin"
    | "ramen"
    | "riceCake"
    | "sesameLeaf"
    | "vegetables"
    | "wheat";
  korean: string;
  alt?: string; // 헉 대박 .. 콜론 앞에 ? 붙이면 | undefined와 같다
}
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

const testF = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("각종 양념장 테스트");
};

const testM = (event: MouseEvent) => {
  event.stopPropagation();
  console.log("test 1");
  console.log(event.target);
  console.log(event);
};

const RecommandPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.rootContainer}>
      <h1>우리 집 냉장고에는??</h1>
      <Paper className={classes.container} elevation={3}>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend
              className={classes.foodLegends}
              style={{ backgroundColor: "#BADA55" }}
            >
              메인 재료로는
            </legend>
            {mainIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  className={classes.ingredientChip}
                  onClick={testM}
                  clickable
                />
              );
            })}
          </fieldset>
        </section>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend
              className={classes.foodLegends}
              style={{ backgroundColor: "#BADA55" }}
            >
              서브 재료로는
            </legend>
            {subIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  clickable
                />
              );
            })}
          </fieldset>
        </section>
      </Paper>
      <h1>가 있다!!</h1>

      <FormControlLabel
        control={<Checkbox name="seasoning" onChange={testF} />}
        labelPlacement="start"
        label="각종 양념장도 있다!"
      />
      <Button fullWidth variant="contained" color="primary">
        메뉴 추천받기
      </Button>
    </Paper>
  );
};

export default RecommandPage;
