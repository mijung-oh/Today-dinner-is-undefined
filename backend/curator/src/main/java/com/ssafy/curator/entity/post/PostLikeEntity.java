package com.ssafy.curator.entity.post;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "post_like")
public class PostLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    UserEntity userEntity;

    @ManyToOne
    PostEntity postEntity;

}
