package com.ssafy.curator.dto.recipe;


import lombok.Data;

@Data
public class RecipeRecommendDto {
    private Long RECIPE_ID;
    private String RECIPE_NM_KO;
    private String IMG_URL;
    private Double rate;
}