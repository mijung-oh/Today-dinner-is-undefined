package com.ssafy.curator.controller;

import com.ssafy.curator.dto.user.UserSessionDto;
import com.ssafy.curator.service.LoginService;
import com.ssafy.curator.service.LoginSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommonController {

    private Environment env;
    private LoginService loginSessionService;

    @Autowired
    public CommonController(Environment env, LoginSessionService loginSessionService) {
        this.env = env;
        this.loginSessionService = loginSessionService;
    }

    @GetMapping("/status")
    public String status(){
        return String.format("서버 작동중 . . . . %s port", env.getProperty("server.port"));
    }

    @GetMapping("/currentLogin")
    public UserSessionDto currentLogin(){
        return (UserSessionDto) loginSessionService.getSession();
    }

    @GetMapping("/currentLogin/test")
    public UserSessionDto currentLoginTest(){
        UserSessionDto userSessionDto = new UserSessionDto();
        userSessionDto.setEmail("zang9412@naver.com");
        userSessionDto.setName("이주선");
        userSessionDto.setNickname("김서방");
        return userSessionDto;
    }

}
