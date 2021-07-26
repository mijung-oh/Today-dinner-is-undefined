package com.ssafy.curator.dto.recipe;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
public class RecipeProcessDto implements Serializable {
    private Long ROW_NUM;
    private int COOKING_NO;
    private String COOKING_DC;
    private String STRE_STEP_IMAGE_URL;
}
