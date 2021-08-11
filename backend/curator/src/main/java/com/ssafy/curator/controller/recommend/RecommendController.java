package com.ssafy.curator.controller.recommend;

import com.ssafy.curator.dto.recipe.RecipeRecommendDto;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientMap;
import com.ssafy.curator.repository.recipe.RecipeIngredientMapRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import com.ssafy.curator.service.recipe.RecipeService;
import com.ssafy.curator.service.recommend.RecommendService;
import com.ssafy.curator.vo.recommend.RequestIngredient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class RecommendController {

    @Autowired
    RecommendService recommendService;

    @PostMapping("/getRecommendList")
    List<RecipeRecommendDto> getRecommendList(@RequestBody RequestIngredient requestIngredient) {
        return recommendService.getRecommendList(requestIngredient);
    }

}
