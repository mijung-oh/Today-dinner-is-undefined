package com.ssafy.curator.controller;

import com.google.common.primitives.Chars;
import com.ssafy.curator.dto.recipe.RecipeIngredientDto;
import com.ssafy.curator.entity.recipe.RecipeIngredientMap;
import com.ssafy.curator.repository.recipe.RecipeIngredientMapRepository;
import com.ssafy.curator.repository.recipe.RecipeIngredientRepository;
import com.ssafy.curator.service.recipe.RecipeService;
import com.ssafy.curator.vo.recipe.ResponseIngredients;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Try {

    @Autowired
    CosineSimilarity cosineSimilarity;

    @Autowired
    RecipeService recipeService;

    @Autowired
    RecipeIngredientMapRepository recipeIngredientMapRepository;

    @GetMapping("/RecipeIngredientMap")
    List<RecipeIngredientMap> getRecipeIngredients() {

        int idx = 0;
        for (int i = 1; i < 50; i++) {
            ResponseRecipeDetail responseRecipeDetail = recipeService.getRecipeDetail((long) i);
            List<RecipeIngredientDto> recipeIngredientDtos = responseRecipeDetail.getIngredients();

            for (RecipeIngredientDto recipeIngredientDto : recipeIngredientDtos) {

                RecipeIngredientMap recipeIngredientMap = new RecipeIngredientMap();
                String name = recipeIngredientDto.getIRDNT_NM();
                if (recipeIngredientMapRepository.existsByName(name)) {
                    continue;
                } else {
                    recipeIngredientMap.setName(name);
                    recipeIngredientMap.setNumber(idx);
                    idx ++;
                }
                recipeIngredientMapRepository.save(recipeIngredientMap);
            }
        }

        return recipeIngredientMapRepository.findAll();
    }

    @GetMapping("/getCos")
    List<Double> getCos() {
        List<Double> results = new ArrayList<>();

        HashMap<CharSequence, Integer> leftmap = new HashMap();


        leftmap.put("쌀", recipeIngredientMapRepository.findByName("쌀").getNumber());
        leftmap.put("안심", recipeIngredientMapRepository.findByName("안심").getNumber());
        leftmap.put("콩나물", recipeIngredientMapRepository.findByName("콩나물").getNumber());
        leftmap.put("청포묵", recipeIngredientMapRepository.findByName("청포묵").getNumber());
        leftmap.put("소금", recipeIngredientMapRepository.findByName("소금").getNumber());
        leftmap.put("국간장", recipeIngredientMapRepository.findByName("국간장").getNumber());
        leftmap.put("다진파", recipeIngredientMapRepository.findByName("다진파").getNumber());
        leftmap.put("다진마늘", recipeIngredientMapRepository.findByName("다진마늘").getNumber());
        leftmap.put("참기름", recipeIngredientMapRepository.findByName("참기름").getNumber());
        leftmap.put("고추장", recipeIngredientMapRepository.findByName("고추장").getNumber());

        for (int i = 1; i < 50; i++) {
            ResponseRecipeDetail responseRecipeDetail = recipeService.getRecipeDetail((long) i);
            List<RecipeIngredientDto> recipeIngredientDtos = responseRecipeDetail.getIngredients();

            HashMap<CharSequence, Integer> rightmap = new HashMap();

            for (RecipeIngredientDto recipeIngredientDto : recipeIngredientDtos) {
                String name = recipeIngredientDto.getIRDNT_NM();
                if (recipeIngredientMapRepository.findByName(name) == null) {
                    rightmap.put(name, 0);
                } else {
                    rightmap.put(name, Integer.valueOf(recipeIngredientMapRepository.findByName(name).getNumber()));
                }
            }

            results.add(cosineSimilarity.cosineSimilarity(leftmap, rightmap));
        }

        return results;
    }
}
