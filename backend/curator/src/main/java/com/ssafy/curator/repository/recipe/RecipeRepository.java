package com.ssafy.curator.repository.recipe;

import com.ssafy.curator.entity.recipe.RecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {
}
