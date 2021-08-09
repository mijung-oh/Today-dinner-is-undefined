package com.ssafy.curator.repository.recommend;

import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.recommend.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer> {
    List<ReplyEntity> findBySurveyId(Long id);
    ReplyEntity findById(Long id);
}
