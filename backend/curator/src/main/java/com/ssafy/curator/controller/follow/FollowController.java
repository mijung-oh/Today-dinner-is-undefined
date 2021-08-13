package com.ssafy.curator.controller.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.service.follow.FollowService;
import com.ssafy.curator.vo.user.RequestAlarm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    // 팔로우하기
    @PostMapping("/follow/{followingNickname}")
    public String follow(@RequestParam String userNickname, @PathVariable String followingNickname) throws ExecutionException, InterruptedException {
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

    // 알람 읽음 처리
    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody RequestAlarm alarm) throws ExecutionException, InterruptedException {
        followService.checkout(alarm);
        return ResponseEntity.status(HttpStatus.OK).body(String.format("[ %s ] 유저 알람 읽음", alarm.getTarget()));
    }

}
