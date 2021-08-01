package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import java.util.List;

public interface FollowService {
    String follow(String userNickname, String followingNickname);
    List<UserDto> showFollowings(String followingNickname);
    List<UserDto> showFollowers(String followingNickname);
    String deleteFollow(String userNickname, String followingNickname);

}
