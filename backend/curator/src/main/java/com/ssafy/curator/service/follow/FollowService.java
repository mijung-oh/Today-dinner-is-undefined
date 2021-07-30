package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import java.util.List;

public interface FollowService {
    String follow(String email, String followingEmail);
    List<UserDto> showFollowings(String followingEmail);
    List<UserDto> showFollowers(String followingEmail);
    String deleteFollow(String username, String followingEmail);

}
