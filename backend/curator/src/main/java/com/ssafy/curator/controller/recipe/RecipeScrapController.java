package com.ssafy.curator.controller.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.recipe.RecipeScrapEntity;
import com.ssafy.curator.service.recipe.RecipeScrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/recipe")
public class RecipeScrapController {

    @Autowired
    RecipeScrapService recipeScrapService;

    @PostMapping("/{recipeId}")
    String scrap(@RequestParam String username, @PathVariable Long recipeId) {
        return recipeScrapService.scrap(username, recipeId);
    }

    @GetMapping("/{recipeId}/userList")
    List<UserDto> scrapUserList(@PathVariable Long recipeId) {
        return recipeScrapService.scrapUserList(recipeId);
    }

    @GetMapping("/{username}/recipeList")
    List<RecipeDto> scrapRecipeList(@PathVariable String username) {
        return recipeScrapService.scrapRecipeList(username);
    }
}
