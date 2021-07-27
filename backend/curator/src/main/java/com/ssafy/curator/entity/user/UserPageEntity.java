package com.ssafy.curator.entity.user;


import lombok.Data;
import org.apache.catalina.User;

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

    @OneToOne
    UserEntity user;

}
