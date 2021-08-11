package com.ssafy.curator.controller.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.service.recipe.RecipeScrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/scrap")
public class RecipeScrapController {

    @Autowired
    RecipeScrapService recipeScrapService;

    @GetMapping("/getAllRecipe/orderByScrapCount")
    public ResponseEntity<List<RecipeDto>> getAllRecipeOrderByScrapCount(){
        return ResponseEntity.status(HttpStatus.OK).body(recipeScrapService.getAllRecipeOrderByScrapCount());
    }

    @PostMapping("/{recipeId}")
    String scrap(HttpServletRequest request, @PathVariable Long recipeId) {
        return recipeScrapService.scrap(request, recipeId);
    }

    @GetMapping("/{recipeId}/userList")
    List<String> scrapUserList(@PathVariable Long recipeId) {
        return recipeScrapService.scrapUserList(recipeId);
    }

    @GetMapping("/{nickname}/recipeList")
    List<RecipeDto> scrapRecipeList(@PathVariable String nickname) {
        return recipeScrapService.scrapRecipeList(nickname);
    }
}
