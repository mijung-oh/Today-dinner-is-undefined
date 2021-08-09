package com.ssafy.curator.dto.recommend;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class SurveyDto {

    Long id;
    UserEntity user;
    String ingredients;
    String description;
    Timestamp createDate;
    Timestamp updateDate;
    List reply;
}
