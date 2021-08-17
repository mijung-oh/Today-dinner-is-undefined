package com.ssafy.curator.vo.recommend;

import lombok.Data;

import java.util.List;

@Data
public class RequestIngredient {
    private List<String> mainIngredients;
    private List<String> subIngredients;
    private boolean check;
}
