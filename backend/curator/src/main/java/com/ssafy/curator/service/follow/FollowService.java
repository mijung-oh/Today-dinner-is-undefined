package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.vo.user.RequestAlarm;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface FollowService {
    String follow(String userNickname, String followingNickname) throws ExecutionException, InterruptedException;
    List<UserDto> showFollowings(String nickname);
    List<UserDto> showFollowers(String nickname);
    String deleteFollow(String userNickname, String followingNickname);
    void checkout(RequestAlarm alarm) throws ExecutionException, InterruptedException;
}
