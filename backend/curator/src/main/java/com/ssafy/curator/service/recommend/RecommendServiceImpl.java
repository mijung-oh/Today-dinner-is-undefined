package com.ssafy.curator.service.recommend;


import com.ssafy.curator.dto.recipe.RecipeRecommendDto;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import com.ssafy.curator.repository.recipe.RecipeIngredientRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import com.ssafy.curator.service.recipe.RecipeService;
import com.ssafy.curator.vo.recommend.RequestIngredient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RecommendServiceImpl implements RecommendService {
    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    RecipeService recipeService;

    @Autowired
    RecipeIngredientRepository recipeIngredientRepository;

    public List<RecipeRecommendDto> getRecommendList(RequestIngredient requestIngredient) {
        ArrayList<Double[]> sorted = new ArrayList<>();

        HashMap<CharSequence, Double> leftmap = new HashMap();
        for (String s : requestIngredient.getMainIngredients()) {
            leftmap.put(s, 10.0);
        }
        for (String s : requestIngredient.getSubIngredients()) {
            leftmap.put(s, 5.0);
        }

        List<String> defaultSource = new ArrayList<>();
        defaultSource.add("소금");
        defaultSource.add("간장");
        defaultSource.add("고추장");
        defaultSource.add("참기름");
        defaultSource.add("후추");

        // 기본 양념이 있는 경우
        if (requestIngredient.isCheck()) {
            for (String s : defaultSource) {
                leftmap.put(s, 3.0);
            }
        }


        for (RecipeEntity o : recipeRepository.findAll()) {
            List<RecipeIngredientEntity> recipeIngredientEntities = o.getIngredientEntities();
            HashMap<CharSequence, Double> rightmap = new HashMap();
            for (RecipeIngredientEntity recipeIngredientEntity : recipeIngredientEntities) {
                String name = recipeIngredientEntity.getIRDNT_NM();
                if (requestIngredient.getMainIngredients().contains(name)) {
                    rightmap.put(name, 10.0);
                } else if (requestIngredient.getSubIngredients().contains(name)) {
                    rightmap.put(name, 5.0);
                } else if (defaultSource.contains(name)) {
                    rightmap.put(name, 3.0);
                } else {
                    rightmap.put(name, 1.0);
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

            List<RecipeIngredientEntity> recipeIngredientEntities = recipeIngredientRepository.findByRecipeEntity(recipeRepository.findById(id).get());

            List<String> ingredients2 = new ArrayList<>();
            recipeIngredientEntities.forEach(recipeIngredientEntity -> ingredients2.add(recipeIngredientEntity.getIRDNT_NM()));

            RecipeRecommendDto recipeRecommendDto = new ModelMapper().map(recipeRepository.findById(id).get(), RecipeRecommendDto.class);
            recipeRecommendDto.setIngredientEntities(ingredients2);
            recipeRecommendDto.setRate(sorted.get(i)[0]);

            List<String> userSelects = new ArrayList<>();
            userSelects.addAll(requestIngredient.getMainIngredients());
            userSelects.addAll(requestIngredient.getSubIngredients());
            recipeRecommendDto.setUserSelectIngredients(userSelects);

            recipeRecommendDtos.add(recipeRecommendDto);

        }

        return recipeRecommendDtos;
    }


    public Double cosineSimilarity(final Map<CharSequence, Double> leftVector, final Map<CharSequence, Double> rightVector) {
        if (leftVector == null || rightVector == null) {
            throw new IllegalArgumentException("Vectors must not be null");
        }

        final Set<CharSequence> intersection = getIntersection(leftVector, rightVector);

        final double dotProduct = dot(leftVector, rightVector, intersection);
        double d1 = 0.0d;
        for (final Double value : leftVector.values()) {
            d1 += Math.pow(value, 2);
        }
        double d2 = 0.0d;
        for (final Double value : rightVector.values()) {
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

    private Set<CharSequence> getIntersection(final Map<CharSequence, Double> leftVector,
                                              final Map<CharSequence, Double> rightVector) {
        final Set<CharSequence> intersection = new HashSet<>(leftVector.keySet());
        intersection.retainAll(rightVector.keySet());
        return intersection;
    }

    private double dot(final Map<CharSequence, Double> leftVector, final Map<CharSequence, Double> rightVector,
                       final Set<CharSequence> intersection) {
        long dotProduct = 0;
        for (final CharSequence key : intersection) {
            dotProduct += leftVector.get(key) * rightVector.get(key);
        }
        return dotProduct;
    }
}
