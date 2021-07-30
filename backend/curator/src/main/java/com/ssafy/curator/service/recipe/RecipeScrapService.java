package com.ssafy.curator.service.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.user.UserDto;

import java.util.List;

public interface RecipeScrapService {
    String scrap(String username, Long id);
    List<UserDto> scrapUserList(Long id);
    List<RecipeDto> scrapRecipeList(String username);
}
