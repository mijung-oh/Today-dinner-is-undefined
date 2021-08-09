package com.ssafy.curator.repository.recommend;


import com.ssafy.curator.entity.recommend.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SurveyRepository extends JpaRepository<SurveyEntity, Integer> {
    SurveyEntity findById(Long id);
}
