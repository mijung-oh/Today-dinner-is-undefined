package com.ssafy.curator.repository.recipe;

import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredientEntity, Long> {
}
