package com.ssafy.curator.repository.recipe;

import com.ssafy.curator.entity.recipe.RecipeIngredientMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeIngredientMapRepository extends JpaRepository<RecipeIngredientMap, Long> {
    RecipeIngredientMap findByName(String name);

    Boolean existsByName(String name);

    List<RecipeIngredientMap> findAll();
}
