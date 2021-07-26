package com.ssafy.curator.entity.recipe;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name = "recipeIngredient")
public class RecipeIngredientEntity {
    @Id
    private Long ROW_NUM;
    private int IRDNT_SN;
    private String IRDNT_NM;
    private String IRDNT_CPCTY;
    private int IRDNT_TY_CODE;
    private String IRDNT_TY_NM;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECIPE_ID")
    @JsonManagedReference
    RecipeEntity recipeEntity;

    public void setRecipe(RecipeEntity recipeEntity){
        if(this.recipeEntity != null){
            this.recipeEntity.getIngredientEntities().remove(this);
        }
        this.recipeEntity = recipeEntity;
        recipeEntity.getIngredientEntities().add(this);
    }

}
