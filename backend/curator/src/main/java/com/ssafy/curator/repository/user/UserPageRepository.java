package com.ssafy.curator.repository.user;

import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.entity.user.UserPageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserPageRepository extends JpaRepository<UserPageEntity, Long> {

    UserPageEntity findByUser(UserEntity userEntity);
    UserPageEntity findByNickname(String nickname);

    @Transactional
    void deleteByUser(UserEntity userEntity);

    boolean existsByNickname(String nickname);

}
