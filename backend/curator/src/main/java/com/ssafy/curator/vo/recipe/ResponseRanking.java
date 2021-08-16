package com.ssafy.curator.vo.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import lombok.Builder;
import lombok.Data;

@Data
public class ResponseRanking {
    private int ranking;
    private int score;
    private String RecipeName;
    private RecipeDto recipeDto;

    @Builder
    public ResponseRanking(int ranking, int score, RecipeDto recipeDto) {
        this.ranking = ranking;
        this.score = score;
        this.recipeDto = recipeDto;
        this.RecipeName = recipeDto.getRECIPE_NM_KO();
    }
}
