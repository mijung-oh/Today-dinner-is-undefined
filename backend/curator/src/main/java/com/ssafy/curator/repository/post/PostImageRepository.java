package com.ssafy.curator.repository.post;

import com.ssafy.curator.entity.post.PostImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostImageRepository extends JpaRepository<PostImageEntity, Integer> {
    List<PostImageEntity> findByPostId(int id);
}
