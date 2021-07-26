package com.ssafy.curator.controller.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.service.recipe.RecipeService;
import com.ssafy.curator.vo.recipe.ResponseIngredients;
import com.ssafy.curator.vo.recipe.ResponseProcess;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/getRecipeIngredients/{id}")
    public ResponseEntity<ResponseIngredients> getRecipeIngredients(@PathVariable Long id){
        ResponseIngredients recipe = recipeService.getRecipeIngredients(id);
        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    @GetMapping("/getRecipeProcess/{id}")
    public ResponseEntity<ResponseProcess> getRecipeProcess(@PathVariable Long id){
        ResponseProcess recipe = recipeService.getRecipeProcess(id);
        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    @GetMapping("/getRecipeDetail/{id}")
    public ResponseEntity<ResponseRecipeDetail> getRecipeDetail(@PathVariable Long id){
        ResponseRecipeDetail recipe = recipeService.getRecipeDetail(id);
        return ResponseEntity.status(HttpStatus.OK).body(recipe);
    }

    @GetMapping("/getAllRecipe")
    public ResponseEntity<List<RecipeDto>> getAllRecipe(){
        return ResponseEntity.status(HttpStatus.OK).body(recipeService.getAllRecipe());
    }

    @GetMapping("/getRecipe/{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(recipeService.getRecipe(id));
    }

}
