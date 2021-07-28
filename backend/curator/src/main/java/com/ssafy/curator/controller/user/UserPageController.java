package com.ssafy.curator.controller.user;

import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.service.user.UserPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserPageController {

    @Autowired
    UserPageService userPageService;

    @PostMapping("/userInfo")
    String createUserInfo(@RequestParam String email, @RequestParam String nickName, @RequestParam String introduction) {
        return userPageService.createUserInfo(email, nickName, introduction);
    }

    @GetMapping("/userInfo")
    UserPageDto getUserInfo(@RequestParam String email) {
        return userPageService.getUserInfo(email);
    }

}
