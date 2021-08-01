package com.ssafy.curator.vo.oauth;

import lombok.Data;

@Data
public class KakaoOAuthRequest {
    private String grant_type;
    private String client_id;
    private String redirect_uri;
    private String code;
    private String client_secret;
}
