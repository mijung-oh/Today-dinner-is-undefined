package com.ssafy.curator.repository.user;


import com.ssafy.curator.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    Boolean existsByEmail(String email);

    // Follow
    UserEntity findByName(String username);
    List<UserEntity> findByNameContaining(String username);

}
