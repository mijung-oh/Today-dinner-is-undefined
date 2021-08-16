package com.ssafy.curator.repository.recipe;

import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredientEntity, Long> {
    List<RecipeIngredientEntity> findAll();

    List<RecipeIngredientEntity> findByRecipeEntity(RecipeEntity recipeEntity);
}
