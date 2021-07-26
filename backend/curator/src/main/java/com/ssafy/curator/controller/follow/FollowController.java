package com.ssafy.curator.controller.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
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
    @PostMapping("/{followingName}")
    public String follow(@RequestParam String username, @PathVariable String followingName) {
        return followService.follow(username, followingName);
    }

    // 나를 팔로우한 사람들 리스트
    @GetMapping("/{username}/followers")
    List<UserDto> showFollowers(@PathVariable String username) throws Exception{
        return followService.showFollowers(username);
    }

    // 내가 팔로우한 사람들 리스트
    @GetMapping("/{username}/followings")
    List<UserDto> showFollowings(@PathVariable String username) {
        return followService.showFollowings(username);
    }

    // 팔로우 취소
    @DeleteMapping("/{followingName}/delete")
    String deleteFollow(@RequestParam String username, @PathVariable String followingName) {
        return followService.deleteFollow(username, followingName);
    }
}
