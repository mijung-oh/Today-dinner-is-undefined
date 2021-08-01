package com.ssafy.curator.dto.user;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class UserDto implements Serializable {
    private String userId;
    private String email;
    private String name;
    private String nickname;
    private LocalDateTime createdDate;
}
