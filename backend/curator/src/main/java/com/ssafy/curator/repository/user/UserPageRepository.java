package com.ssafy.curator.repository.user;

import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.entity.user.UserPageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPageRepository extends JpaRepository<UserPageEntity, Long> {
<<<<<<< HEAD
    UserPageEntity findByUser(UserEntity userEntity);
=======
        UserPageEntity findByUser(UserEntity userEntity);
>>>>>>> 2f62e1200521173230b7ac2ea07c3a648b7b879b
}
