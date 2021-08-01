package com.ssafy.curator.service;

import com.ssafy.curator.dto.user.UserSessionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginSessionService implements LoginService {

    private static final String USER = "USER";
    private final HttpSession session;

    @Autowired
    public LoginSessionService(HttpSession session) {
        this.session = session;
    }

    public UserSessionDto getSession(){
        return (UserSessionDto) session.getAttribute(USER);
    }
    public void setSession(UserSessionDto sessionDto){
        session.setAttribute(USER, sessionDto);
    }
    public void removeSession(){
        session.removeAttribute(USER);
    }
    @Override
    public String getSessionId() {
        return session.getId();
    }

}
