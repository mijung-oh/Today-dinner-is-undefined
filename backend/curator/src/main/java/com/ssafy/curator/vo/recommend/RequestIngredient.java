package com.ssafy.curator.vo.recommend;

import lombok.Data;

import java.util.List;

@Data
public class RequestIngredient {
    private List<String> ingredients;
    private boolean check;
}
