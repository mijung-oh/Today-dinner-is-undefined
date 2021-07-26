package com.ssafy.curator.entity.recipe;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "recipeIngredient")
public class RecipeIngredientEntity {
    @Id
    private Long ROW_NUM;
    private int RECIPE_ID;
    private int IRDNT_SN;
    private String IRDNT_NM;
    private String IRDNT_CPCTY;
    private int IRDNT_TY_CODE;
    private String IRDNT_TY_NM;
}
