package com.ssafy.curator.dto.post;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class PostWithImageDto {

    Long id;
    String title;
    String ingredients;
    String description;
    UserEntity user;
    Timestamp createDate;
    Timestamp updateDate;
    List imagePath;
    List comment;
}
