package com.ssafy.curator.vo.oauth;

import lombok.Data;

@Data
public class KakaoOAuthResponse {
    private String token_type;
    private String access_token;
    private String refresh_token;
    private String scope;
    private int expires_in;
    private int refresh_token_expires_in;

}
