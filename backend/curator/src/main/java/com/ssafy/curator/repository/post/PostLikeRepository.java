package com.ssafy.curator.repository.post;

import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
    @Transactional
    void deleteByUserEntityAndPostEntity(UserEntity userEntity, PostEntity postEntity);
}
