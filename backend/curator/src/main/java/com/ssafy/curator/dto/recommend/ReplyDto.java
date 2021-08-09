package com.ssafy.curator.dto.recommend;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ReplyDto {
    Long id;
    String content;
    UserEntity user;
    Timestamp createDate;
    Timestamp updateDate;
}
