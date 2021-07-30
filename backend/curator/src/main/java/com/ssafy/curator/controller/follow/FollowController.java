package com.ssafy.curator.controller.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.service.follow.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    // 팔로우하기
    @PostMapping("/{followingEmail}")
    public String follow(@RequestParam String email, @PathVariable String followingEmail) {
        return followService.follow(email, followingEmail);
    }

    // 나를 팔로우한 사람들 리스트
    @GetMapping("/{followingEmail}/followers")
    List<UserDto> showFollowers(@PathVariable String followingEmail) {
        return followService.showFollowers(followingEmail);
    }

    // 내가 팔로우한 사람들 리스트
    @GetMapping("/{followingEmail}/followings")
    List<UserDto> showFollowings(@PathVariable String followingEmail) {
        return followService.showFollowings(followingEmail);
    }

    // 팔로우 취소
    @DeleteMapping("/{followingEmail}")
    String deleteFollow(@RequestParam String email, @PathVariable String followingEmail) {
        return followService.deleteFollow(email, followingEmail);
    }
}
