package com.ssafy.curator.entity.recipe;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.curator.entity.post.PostLikeEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter @Setter
@Entity
@Table(name = "recipe")
public class RecipeEntity {
    @Id
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

    @OneToMany(mappedBy = "recipeEntity")
    @JsonBackReference
    private List<RecipeIngredientEntity> ingredientEntities;

    @OneToMany(mappedBy = "recipeEntity")
    @JsonBackReference
    private List<RecipeProcessEntity> processEntities;

    // 스크랩
    @OneToMany(mappedBy = "recipeEntity")
    @JsonIgnore
    private List<RecipeScrapEntity> recipeScrapEntities;

    private int scrapCount = 0;

}


