package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;

public interface UserService {
    UserDto getUserByUserEmail(String email);
    void createPlatformUser(UserDto userDto, String platform);
    boolean existUser(String email);
}
