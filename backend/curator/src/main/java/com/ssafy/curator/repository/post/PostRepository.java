package com.ssafy.curator.repository.post;

import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Integer> {
    List<PostEntity> findByUser(UserEntity userEntity);
    PostEntity findById(Long id);
    List<PostEntity> findByUserOrderByCreateDateDesc(UserEntity userEntity);
}

