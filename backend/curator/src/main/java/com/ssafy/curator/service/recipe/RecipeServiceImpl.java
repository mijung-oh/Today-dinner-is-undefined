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
import com.ssafy.curator.vo.recipe.ResponseRanking;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
public class RecipeServiceImpl implements RecipeService{

    private final String KEY = "recipeRanking";

    RecipeRepository recipeRepository;
    RecipeIngredientRepository recipeIngredientRepository;
    RecipeProcessRepository recipeProcessRepository;

    @Resource(name = "redisRankingTemplate")
    RedisTemplate<String, String> redisTemplate;
    ZSetOperations<String, String> zSetOperations;

    @Resource(name = "redisCacheTemplate")
    RedisTemplate<String, RecipeDto> redisCacheTemplate;

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
    @Cacheable(value = "recipe", key = "#id", cacheManager = "cacheManager")
    public RecipeDto getRecipe(Long id) {
        RecipeDto oneRecipe = getOneRecipe(id);
        setData(String.format("%s",id), oneRecipe);
        return oneRecipe;
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

    @Override
    public List<ResponseRanking> getRanking() {
        zSetOperations = redisTemplate.opsForZSet();

        Set<ZSetOperations.TypedTuple<String>> typedTuples = zSetOperations.reverseRangeWithScores(KEY, 0, 4);
        Iterator<ZSetOperations.TypedTuple<String>> iterator = typedTuples.iterator();

        List<ResponseRanking> list = new ArrayList<>();
        int ranking = 1;
        while (iterator.hasNext()) {
            ZSetOperations.TypedTuple<String> next = iterator.next();
            RecipeDto oneRecipe = getOneRecipe(Long.parseLong(next.getValue()));
            list.add(ResponseRanking.builder()
                        .ranking(ranking++)
                        .score(next.getScore().intValue())
                        .recipeDto(oneRecipe)
                        .build());
        }
        return list;
    }

    @Override
    public void addRanking(String recipeId) {
        zSetOperations = redisTemplate.opsForZSet();
        Double score = zSetOperations.score(KEY,recipeId);
        if(score == null){
            zSetOperations.add(KEY,recipeId,1);
        }
        else {
            zSetOperations.add(KEY,recipeId,score + 1);
        }

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

    public void setData(String key, RecipeDto value){
        ValueOperations<String,RecipeDto> valueOperations = redisCacheTemplate.opsForValue();
        valueOperations.set(key,value);
    }

}
