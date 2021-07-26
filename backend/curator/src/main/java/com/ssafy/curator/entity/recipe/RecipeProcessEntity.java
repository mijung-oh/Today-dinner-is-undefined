package com.ssafy.curator.entity.recipe;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name = "recipeProcess")
public class RecipeProcessEntity {
    @Id
    private Long ROW_NUM;
    private int COOKING_NO;
    private String COOKING_DC;
    private String STRE_STEP_IMAGE_URL;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECIPE_ID")
    @JsonManagedReference
    RecipeEntity recipeEntity;

    public void setRecipe(RecipeEntity recipeEntity){
        if(this.recipeEntity != null){
            this.recipeEntity.getIngredientEntities().remove(this);
        }
        this.recipeEntity = recipeEntity;
        recipeEntity.getProcessEntities().add(this);
    }

}
