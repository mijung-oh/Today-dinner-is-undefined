package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserPageDto;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserService {
    UserDto getUserByUserEmail(String email);
    void createPlatformUser(UserDto userDto, String platform);
    boolean existUser(String email);
}
