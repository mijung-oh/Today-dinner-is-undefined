import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeDetailPage from "../page/RecipeDetailPage";

function RecipeDetail({ match }) {
  const recipe_id = match.params.id;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // setError(null);
        setRecipe(null);
        setLoading(true);
        const response = await axios.get(
          `http://i5c207.p.ssafy.io/curation/recipe/getRecipeDetail/${recipe_id}`
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
      `http://i5c207.p.ssafy.io/curation/scrap/${recipe_id}`,
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

  return <RecipeDetailPage recipe={recipe} onToScrap={onToScrap} />;
}

export default RecipeDetail;
