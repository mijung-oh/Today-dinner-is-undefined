package com.ssafy.curator.service.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.recipe.RecipeIngredientDto;
import com.ssafy.curator.dto.recipe.RecipeProcessDto;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import com.ssafy.curator.entity.recipe.RecipeProcessEntity;
import com.ssafy.curator.repository.recipe.RecipeIngredientRepository;
import com.ssafy.curator.repository.recipe.RecipeProcessRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import com.ssafy.curator.vo.recipe.ResponseIngredients;
import com.ssafy.curator.vo.recipe.ResponseProcess;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService{

    RecipeRepository recipeRepository;
    RecipeIngredientRepository recipeIngredientRepository;
    RecipeProcessRepository recipeProcessRepository;

    ModelMapper mapper;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, RecipeProcessRepository recipeProcessRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeProcessRepository = recipeProcessRepository;
        mapper = new ModelMapper();
    }

    @Override
    public ResponseIngredients getRecipeIngredients(Long id) {
        RecipeDto oneRecipe = getOneRecipe(id);
        List<RecipeIngredientDto> ingredientListFromRecipe = getIngredientListFromRecipe(id);

        ResponseIngredients responseIngredients = new ModelMapper().map(oneRecipe, ResponseIngredients.class);
        responseIngredients.setIngredients(ingredientListFromRecipe);

        return responseIngredients;
    }

    @Override
    public ResponseRecipeDetail getRecipeDetail(Long id) {
        RecipeDto oneRecipe = getOneRecipe(id);
        List<RecipeIngredientDto> ingredientList = getIngredientListFromRecipe(id);
        List<RecipeProcessDto> processList = getProcessListFromRecipe(id);

        ResponseRecipeDetail responseRecipeDetail = mapper.map(oneRecipe, ResponseRecipeDetail.class);
        responseRecipeDetail.setIngredients(ingredientList);
        responseRecipeDetail.setProcess(processList);

        return responseRecipeDetail;
    }

    @Override
    public List<RecipeDto> getAllRecipe() {
        List<RecipeEntity> EntityList = recipeRepository.findAll();
        List<RecipeDto> recipeDtoList = new ArrayList<>();
        EntityList.forEach(v->{
            recipeDtoList.add(mapper.map(v, RecipeDto.class));
        });
        return recipeDtoList;
    }

    @Override
    public ResponseProcess getRecipeProcess(Long id) {
        RecipeDto oneRecipe = getOneRecipe(id);
        List<RecipeProcessDto> processList = getProcessListFromRecipe(id);

        ResponseProcess responseProcess = mapper.map(oneRecipe, ResponseProcess.class);
        responseProcess.setProcess(processList);

        return responseProcess;
    }

    @Override
    public RecipeDto getRecipe(Long id) {
        return getOneRecipe(id);
    }

    public List<RecipeIngredientDto> getIngredientListFromRecipe(Long id){
        RecipeEntity recipe = recipeRepository.findById(id).orElseThrow(RuntimeException::new);

        List<RecipeIngredientDto> ingredientList = new ArrayList<>();
        for(RecipeIngredientEntity v : recipe.getIngredientEntities()){
            RecipeIngredientDto recipeIngredientDto = mapper.map(v, RecipeIngredientDto.class);
            ingredientList.add(recipeIngredientDto);
        }
        return ingredientList;
    }

    public List<RecipeProcessDto> getProcessListFromRecipe(Long id){
        RecipeEntity recipe = recipeRepository.findById(id).orElseThrow(RuntimeException::new);

        List<RecipeProcessDto> processList = new ArrayList<>();
        for(RecipeProcessEntity v : recipe.getProcessEntities()){
            RecipeProcessDto recipeProcessDto = mapper.map(v, RecipeProcessDto.class);
            processList.add(recipeProcessDto);
        }
        return processList;
    }

    public RecipeDto getOneRecipe(Long id){
        Optional<RecipeEntity> recipe = recipeRepository.findById(id);
        return new ModelMapper().map(recipe.orElseThrow(RuntimeException::new), RecipeDto.class);
    }

}
