package com.ssafy.curator.controller.user;

import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.service.user.UserPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@RestController
public class UserPageController {

    @Autowired
    UserPageService userPageService;

    @Autowired
    UserRepository userRepository;

    // 닉네임등록 추가
    @PostMapping("/createNickname")
    String createNickname(@RequestParam String email, @RequestParam String nickname) {
        return userPageService.createNickname(email, nickname);
    }


    // 닉네임중복 처리
    @GetMapping("/checkNickname")
    String checkNickname(@RequestParam String nickname) {
        return userPageService.checkNickname(nickname);
    }


    // 마이페이지 등록
    @PostMapping("/userInfo")
    UserPageDto createUserInfo(@RequestParam String userNickname,  @RequestParam String introduction
    , MultipartHttpServletRequest multipartHttpServletRequest) {
        return userPageService.createUserInfo(userNickname, introduction, multipartHttpServletRequest);
    }


    // 마이페이지 가져오기
    @GetMapping("/userInfo/{nickname}")
    UserPageDto getUserInfo(@PathVariable String nickname) {
        if (userPageService.existsByNickname(nickname)) {
            return userPageService.getUserInfo(nickname);
        }
        return userPageService.createUserInfo(nickname, null, null );
    }


    // 마이페이지 수정
    @PutMapping("/userInfo")
    String updateUserInfo(@RequestParam String nickname,
                          @RequestParam String introduction,
                          @RequestParam(name = "profileImg") MultipartFile multipartFile1,
                          @RequestParam(name = "bgImg") MultipartFile multipartFile2) {
        return userPageService.updateUserInfo(nickname, introduction, multipartFile1, multipartFile2);
    }

}
