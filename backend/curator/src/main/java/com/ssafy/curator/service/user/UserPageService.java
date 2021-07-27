package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserPageDto;

import javax.validation.constraints.Email;
import java.util.List;

public interface UserPageService {
    String createUserInfo(String email, String nickName, String introduction);

    UserPageDto getUserInfo(String email);

}
