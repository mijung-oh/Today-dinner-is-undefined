package com.ssafy.curator.vo.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseLogout {
    private int code;
    private String message;
}
