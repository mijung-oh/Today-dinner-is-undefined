package com.ssafy.curator.entity.user;


import lombok.Data;

import javax.persistence.*;

@Table(name = "user_page")
@Data
@Entity
public class UserPageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nickName;
    String introduction;
    String profileImg;
    String bgImg;

    @OneToOne
    UserEntity user;

}
