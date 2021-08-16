package com.ssafy.curator.service.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.vo.recipe.ResponseIngredients;
import com.ssafy.curator.vo.recipe.ResponseProcess;
import com.ssafy.curator.vo.recipe.ResponseRanking;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;

import java.util.List;

public interface RecipeService {
    RecipeDto getRecipe(Long id);
    List<RecipeDto> getAllRecipe();

    ResponseProcess getRecipeProcess(Long id);
    ResponseIngredients getRecipeIngredients(Long id);
    ResponseRecipeDetail getRecipeDetail(Long id);

    List<ResponseRanking> getRanking();
    void addRanking(String recipeId);
}
