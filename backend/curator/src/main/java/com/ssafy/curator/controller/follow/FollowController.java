package com.ssafy.curator.controller.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.service.follow.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    // 팔로우하기
    @PostMapping("/follow/{followingNickname}")
    public String follow(@RequestParam String userNickname, @PathVariable String followingNickname) {
        return followService.follow(userNickname, followingNickname);
    }

    // 나를 팔로우한 사람들 리스트
    @GetMapping("/{nickname}/followers")
    List<UserDto> showFollowers(@PathVariable String nickname) {
        return followService.showFollowers(nickname);
    }

    // 내가 팔로우한 사람들 리스트
    @GetMapping("/{nickname}/followings")
    List<UserDto> showFollowings(@PathVariable String nickname) {
        return followService.showFollowings(nickname);
    }

    // 팔로우 취소
    @DeleteMapping("/follow/{followingNickname}")
    String deleteFollow(@RequestParam String userNickname, @PathVariable String followingNickname) {
        return followService.deleteFollow(userNickname, followingNickname);
    }
}
