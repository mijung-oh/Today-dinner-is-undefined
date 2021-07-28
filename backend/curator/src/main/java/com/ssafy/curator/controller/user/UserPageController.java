package com.ssafy.curator.controller.user;

import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.service.user.UserPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@RestController
public class UserPageController {

    @Autowired
    UserPageService userPageService;

    @PostMapping("/userInfo")
    String createUserInfo(@RequestParam String email, @RequestParam String nickName, @RequestParam String introduction
    , MultipartHttpServletRequest multipartHttpServletRequest) {
        return userPageService.createUserInfo(email, nickName, introduction, multipartHttpServletRequest);
    }

    @GetMapping("/userInfo")
    UserPageDto getUserInfo(@RequestParam String email) {
        return userPageService.getUserInfo(email);
    }

}
