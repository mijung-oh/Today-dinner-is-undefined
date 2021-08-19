//프로필에 띄울 개별 Article들의 type입니다. 아이고 나 죽어
export interface ArticleProps {
  title: string;
  description: string;
  imagePaths: any;
  ingredients: string;
  createDate: string;
}

export interface Ingredient {
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

export interface RankFoodProps {
  ranking: number;
  score: number;
  recipeDto: any;
  recipeName: string;
}
