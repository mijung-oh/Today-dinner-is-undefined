package com.ssafy.curator.entity.recipe;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "recipeProcess")
public class RecipeProcessEntity {
    @Id
    private Long ROW_NUM;
    private int RECIPE_ID;
    private int COOKING_NO;
    private String COOKING_DC;
    private String STRE_STEP_IMAGE_URL;
}
