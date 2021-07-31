package com.ssafy.curator.vo.oauth;

import lombok.Data;

@Data
public class NaverOAuthResponse {
    private String token_type;
    private String access_token;
    private String refresh_token;
    private int expires_in;
}
