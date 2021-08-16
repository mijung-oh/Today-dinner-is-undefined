package com.ssafy.curator.repository.recipe;

import com.ssafy.curator.entity.recipe.RecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {
    List<RecipeEntity> findAllByOrderByScrapCountDesc();
//    RecipeEntity findByRECIPE_NM_KO(String RECIPE_NM_KO);
}
