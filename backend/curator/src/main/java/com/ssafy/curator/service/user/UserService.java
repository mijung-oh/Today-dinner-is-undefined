package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.vo.user.ResponseLogin;

public interface UserService {
    UserDto getUserByUserEmail(String email);
    void createPlatformUser(UserDto userDto, String platform);
    boolean existUser(String email);

    boolean existUserNickname(String nickname);

    ResponseLogin addUserNickname(String nickname, String email);
}
