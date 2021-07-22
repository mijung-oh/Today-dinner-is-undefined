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
        return String.format("It's running on %s", env.getProperty("server.port"));
    }

    @GetMapping("/currentLogin")
    public UserSessionDto currentLogin(){
        return (UserSessionDto) loginSessionService.getSession();
    }

}
