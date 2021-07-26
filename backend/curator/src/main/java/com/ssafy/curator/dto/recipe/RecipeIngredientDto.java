package com.ssafy.curator.dto.recipe;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
public class RecipeIngredientDto implements Serializable {
    private Long ROW_NUM;
    private int IRDNT_SN;
    private String IRDNT_NM;
    private String IRDNT_CPCTY;
    private int IRDNT_TY_CODE;
    private String IRDNT_TY_NM;
}
