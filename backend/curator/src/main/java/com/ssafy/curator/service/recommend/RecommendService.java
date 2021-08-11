package com.ssafy.curator.service.recommend;

import com.ssafy.curator.dto.recipe.RecipeRecommendDto;
import com.ssafy.curator.vo.recommend.RequestIngredient;

import java.util.List;

public interface RecommendService {
    List<RecipeRecommendDto> getRecommendList(RequestIngredient requestIngredient);
}
