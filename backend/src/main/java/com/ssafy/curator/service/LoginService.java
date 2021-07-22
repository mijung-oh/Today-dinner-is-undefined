package com.ssafy.curator.service;

import com.ssafy.curator.dto.user.UserSessionDto;

public interface LoginService {
    UserSessionDto getSession();
    void setSession(UserSessionDto sessionDto);
    String getSessionId();
}
