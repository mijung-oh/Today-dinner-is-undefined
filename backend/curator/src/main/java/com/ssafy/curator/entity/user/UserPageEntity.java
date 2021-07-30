package com.ssafy.curator.entity.user;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name = "user_page")
@Data
@Entity
public class UserPageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String nickname;

    String introduction;
    String profileImg;
    String bgImg;

    @OneToOne
    UserEntity user;

}
