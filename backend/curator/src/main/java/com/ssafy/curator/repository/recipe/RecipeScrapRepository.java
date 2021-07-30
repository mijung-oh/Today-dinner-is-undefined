package com.ssafy.curator.repository.recipe;



import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeScrapEntity;
import com.ssafy.curator.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RecipeScrapRepository extends JpaRepository<RecipeScrapEntity, Long> {
    @Transactional
    void deleteByUserEntityAndRecipeEntity(UserEntity userEntity, RecipeEntity recipeEntity);
    int countByUserEntityAndRecipeEntity(UserEntity userEntity, RecipeEntity recipeEntity);
    List<RecipeEntity> findAllByUserEntity(UserEntity userEntity);
}
