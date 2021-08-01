package com.ssafy.curator.controller.user;

import com.ssafy.curator.service.LoginSessionService;
import com.ssafy.curator.service.user.UserService;
import com.ssafy.curator.vo.user.RequestNickname;
import com.ssafy.curator.vo.user.ResponseLogin;
import com.ssafy.curator.vo.user.ResponseLogout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    Environment env;
    UserService userService;
    LoginSessionService sessionService;

    @Autowired
    public UserController(Environment env, UserService userService, LoginSessionService sessionService) {
        this.env = env;
        this.userService = userService;
        this.sessionService = sessionService;
    }

    @GetMapping("/logout")
    public ResponseEntity<ResponseLogout> logout(){
        sessionService.removeSession();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseLogout(200,"로그아웃"));
    }

    @GetMapping("/userNicknameCheck")
    public boolean userNicknameCheck(@RequestParam String nickname){
        return userService.existUserNickname(nickname);
    }

    @PostMapping("/setNickname")
    public ResponseLogin setNickname(@RequestBody RequestNickname requestNickname){
        return userService.addUserNickname(requestNickname.getNickname(), requestNickname.getEmail());
    }

}
