package com.ssafy.curator.entity.recipe;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class RecipeIngredientMap {
    @Id
    @GeneratedValue
    Long id;

    String name;
    int number;
}
