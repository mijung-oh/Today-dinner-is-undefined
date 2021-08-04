package com.ssafy.curator.dto.post;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class CommentDto {

    Long id;
    String content;
    UserEntity user;
    Timestamp createDate;
    Timestamp updateDate;
}