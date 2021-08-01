package com.ssafy.curator.service.recipe;

import com.ssafy.curator.dto.recipe.RecipeDto;
import com.ssafy.curator.dto.user.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface RecipeScrapService {
    String scrap(HttpServletRequest request, Long id);
    List<UserDto> scrapUserList(Long id);
    List<RecipeDto> scrapRecipeList(String nickname);
}
