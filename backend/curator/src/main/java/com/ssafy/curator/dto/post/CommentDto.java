package com.ssafy.curator.dto.post;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

@Data
public class CommentDto {

    int id;
    String content;
    UserEntity user;
    String createDate;
    String updateDate;
}