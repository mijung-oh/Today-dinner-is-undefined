package com.ssafy.curator.repository.post;

import com.ssafy.curator.entity.post.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findByPostId(int id);
    CommentEntity findById(int id);
}
