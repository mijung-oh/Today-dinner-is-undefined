package com.ssafy.curator.entity.recipe;


import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="Recipe_scrap")
public class RecipeScrapEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    UserEntity userEntity;

    @ManyToOne
    RecipeEntity recipeEntity;
}
