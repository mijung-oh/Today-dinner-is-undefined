package com.ssafy.curator.dto.recipe;


import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RecipeRecommendDto implements Serializable {
    private Long RECIPE_ID;
    private String RECIPE_NM_KO;
    private String IMG_URL;
    private Double rate;
    private List<String> ingredientEntities;
    private List<String> userSelectIngredients;
}
