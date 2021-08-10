import React from "react";

function RecipeDetailPage({ recipe, onToScrap }) {
  return (
    <>
      <h2>{recipe.recipe_NM_KO}</h2>

      <button onClick={onToScrap}>스크랩</button>
      <p>
        재료:
        {recipe.ingredients.map((ingre) => (
          <text>
            {ingre.irdnt_NM}: {ingre.irdnt_CPCTY},
          </text>
        ))}
        recipe:
        {recipe.process.map((process) => (
          <div>
            <p>
              --{process.cooking_NO}--
              {process.cooking_DC}
            </p>
            <img src={process.stre_STEP_IMAGE_URL} />
          </div>
        ))}
        {recipe.sumry}, {recipe.recipe_NM_KO} 완성~~
        <img src={recipe.img_URL} width="300" />
      </p>
    </>
  );
}

export default RecipeDetailPage;
