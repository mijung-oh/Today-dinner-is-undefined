package com.ssafy.curator.controller.recommend;

import com.ssafy.curator.dto.recipe.RecipeRecommendDto;
import com.ssafy.curator.service.recommend.RecommendService;
import com.ssafy.curator.vo.recommend.RequestIngredient;
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
