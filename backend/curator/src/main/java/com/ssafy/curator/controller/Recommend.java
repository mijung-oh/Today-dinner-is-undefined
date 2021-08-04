package com.ssafy.curator.controller;

import com.ssafy.curator.dto.recipe.RecipeIngredientDto;
import com.ssafy.curator.dto.recipe.RecipeRecommendDto;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientMap;
import com.ssafy.curator.repository.recipe.RecipeIngredientMapRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import com.ssafy.curator.service.recipe.RecipeService;
import com.ssafy.curator.vo.recipe.ResponseRecipeDetail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class Recommend {

    @Autowired
    CosineSimilarity cosineSimilarity;

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    RecipeService recipeService;

    @Autowired
    RecipeIngredientMapRepository recipeIngredientMapRepository;

    @GetMapping("/setRecipeIngredientMap")
    List<RecipeIngredientMap> getRecipeIngredients() {

        int idx = 1;
        for (RecipeEntity o : recipeRepository.findAll()) {
            List<RecipeIngredientEntity> recipeIngredientEntities = o.getIngredientEntities();
            for (RecipeIngredientEntity recipeIngredientEntity : recipeIngredientEntities) {

                RecipeIngredientMap recipeIngredientMap = new RecipeIngredientMap();
                String name = recipeIngredientEntity.getIRDNT_NM();
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

    @GetMapping("/getRecommendList")
    List<RecipeRecommendDto> getRecommendList(@RequestParam(value="ingredient", required=true) List<String> ingredients) {
        ArrayList<Double[]> sorted = new ArrayList<>();

        HashMap<CharSequence, Integer> leftmap = new HashMap();
        for (String s : ingredients) {
            leftmap.put(s, recipeIngredientMapRepository.findByName(s).getNumber());
        }

        for (RecipeEntity o : recipeRepository.findAll()) {
            List<RecipeIngredientEntity> recipeIngredientEntities = o.getIngredientEntities();
            HashMap<CharSequence, Integer> rightmap = new HashMap();
            for (RecipeIngredientEntity recipeIngredientEntity : recipeIngredientEntities) {
                String name = recipeIngredientEntity.getIRDNT_NM();
                if (recipeIngredientMapRepository.findByName(name) == null) {
                    rightmap.put(name, 0);
                } else {
                    rightmap.put(name, Integer.valueOf(recipeIngredientMapRepository.findByName(name).getNumber()));
                }
            }
            sorted.add(new Double[]{cosineSimilarity(leftmap, rightmap), Double.valueOf(o.getRECIPE_ID())});
        }

        Collections.sort(sorted, new Comparator<Double[]>() {
            @Override
            public int compare(Double[] o1, Double[] o2) {
                return Double.compare(o1[0], o2[0]);
            }

        });

        List<RecipeRecommendDto> recipeRecommendDtos = new ArrayList<>();
        for (int i = sorted.size()-1; i >= sorted.size()-5; i--) {
            Long id = sorted.get(i)[1].longValue();
            RecipeRecommendDto recipeRecommendDto = new ModelMapper().map(recipeRepository.findById(id).get(), RecipeRecommendDto.class);
            recipeRecommendDto.setRate(sorted.get(i)[0]);
            recipeRecommendDtos.add(recipeRecommendDto);
        }

        return recipeRecommendDtos;
    }


    public Double cosineSimilarity(final Map<CharSequence, Integer> leftVector, final Map<CharSequence, Integer> rightVector) {
        if (leftVector == null || rightVector == null) {
            throw new IllegalArgumentException("Vectors must not be null");
        }

        final Set<CharSequence> intersection = getIntersection(leftVector, rightVector);

        final double dotProduct = dot(leftVector, rightVector, intersection);
        double d1 = 0.0d;
        for (final Integer value : leftVector.values()) {
            d1 += Math.pow(value, 2);
        }
        double d2 = 0.0d;
        for (final Integer value : rightVector.values()) {
            d2 += Math.pow(value, 2);
        }
        double cosineSimilarity;
        if (d1 <= 0.0 || d2 <= 0.0) {
            cosineSimilarity = 0.0;
        } else {
            cosineSimilarity = (double) (dotProduct / (double) (Math.sqrt(d1) * Math.sqrt(d2)));
        }
        return cosineSimilarity;
    }

    /**
     * Returns a set with strings common to the two given maps.
     *
     * @param leftVector left vector map
     * @param rightVector right vector map
     * @return common strings
     */
    private Set<CharSequence> getIntersection(final Map<CharSequence, Integer> leftVector,
                                              final Map<CharSequence, Integer> rightVector) {
        final Set<CharSequence> intersection = new HashSet<>(leftVector.keySet());
        intersection.retainAll(rightVector.keySet());
        return intersection;
    }

    /**
     * Computes the dot product of two vectors. It ignores remaining elements. It means
     * that if a vector is longer than other, then a smaller part of it will be used to compute
     * the dot product.
     *
     * @param leftVector left vector
     * @param rightVector right vector
     * @param intersection common elements
     * @return the dot product
     */
    private double dot(final Map<CharSequence, Integer> leftVector, final Map<CharSequence, Integer> rightVector,
                       final Set<CharSequence> intersection) {
        long dotProduct = 0;
        for (final CharSequence key : intersection) {
            dotProduct += leftVector.get(key) * rightVector.get(key);
        }
        return dotProduct;
    }



}
