package com.ssafy.curator.dto.user;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserSessionDto implements Serializable {
    private String name;
    private String email;
}
