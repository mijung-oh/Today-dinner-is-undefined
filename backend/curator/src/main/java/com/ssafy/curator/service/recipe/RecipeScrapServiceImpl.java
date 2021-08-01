package com.ssafy.curator.service.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeScrapEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.recipe.RecipeScrapRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeScrapServiceImpl implements RecipeScrapService {

    @Autowired
    RecipeRepository recipeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RecipeScrapRepository recipeScrapRepository;

    public String scrap(HttpServletRequest request, Long id) {
        String nickname = request.getParameter("nickname");
        RecipeEntity recipeEntity = recipeRepository.findById(id).orElseThrow(RuntimeException::new);
        UserEntity userEntity = userRepository.findByNickname(nickname);

        if (recipeScrapRepository.existsByUserEntityAndRecipeEntity(userEntity,recipeEntity)) {
            recipeScrapRepository.deleteByUserEntityAndRecipeEntity(userEntity, recipeEntity);
            return "delete success";
        }
        else {
            RecipeScrapEntity recipeScrapEntity = new RecipeScrapEntity();
            recipeScrapEntity.setRecipeEntity(recipeEntity);
            recipeScrapEntity.setUserEntity(userEntity);

            recipeScrapRepository.save(recipeScrapEntity);

            return "success";

        }
    }

    public List<UserDto> scrapUserList(Long id) {
        List<UserDto> userDtos = new ArrayList<>();

        RecipeEntity recipeEntity = recipeRepository.findById(id).orElseThrow(RuntimeException::new);
        List<RecipeScrapEntity> scrapEntities = recipeEntity.getRecipeScrapEntities();
        for (RecipeScrapEntity s : scrapEntities) {
            UserDto userDto = new ModelMapper().map(s.getUserEntity(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }

    public List<RecipeDto> scrapRecipeList(String nickname) {
        List<RecipeDto> recipeDtos = new ArrayList<>();
        UserEntity userEntity = userRepository.findByNickname(nickname);
        List<RecipeScrapEntity> scrapEntities = userEntity.getRecipeScrapEntities();
        for (RecipeScrapEntity s : scrapEntities) {
            RecipeDto recipeDto = new ModelMapper().map(s.getRecipeEntity(), RecipeDto.class);
            recipeDtos.add(recipeDto);
        }

        return recipeDtos;
    }




}
