package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FollowService {
    String follow(String username, String followingName);
    List<UserDto> showFollowings(String username);
    List<UserDto> showFollowers(String username);
    String deleteFollow(String username, String followingName);

}
