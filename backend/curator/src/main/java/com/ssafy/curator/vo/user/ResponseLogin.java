package com.ssafy.curator.vo.user;

import com.ssafy.curator.dto.user.UserSessionDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseLogin {
    private int code;
    private String message;
    private boolean check;
    private UserSessionDto response;
}
