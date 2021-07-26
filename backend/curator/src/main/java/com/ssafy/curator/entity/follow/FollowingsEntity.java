package com.ssafy.curator.entity.follow;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class FollowingsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    UserEntity follower;

    @ManyToOne
    UserEntity following;


}
