package com.ssafy.curator.vo.recipe;

import com.ssafy.curator.dto.recipe.RecipeIngredientDto;
import com.ssafy.curator.dto.recipe.RecipeProcessDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseRecipeDetail {
    private Long RECIPE_ID;
    private String RECIPE_NM_KO;
    private String SUMRY;
    private String NATION_CODE;
    private String NATION_NM;
    private String TY_CODE;
    private String TY_NM;
    private String COOKING_TIME;
    private String CALORIE;
    private String QNT;
    private String LEVEL_NM;
    private String IRDNT_CODE;
    private String PC_NM;
    private String IMG_URL;
    private String DET_URL;
    private List<RecipeIngredientDto> ingredients = new ArrayList<>();
    private List<RecipeProcessDto> process = new ArrayList<>();
}
