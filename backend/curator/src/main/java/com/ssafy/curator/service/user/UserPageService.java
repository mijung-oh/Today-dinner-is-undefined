package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserPageDto;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface UserPageService {
    String createUserInfo(String email, String nickName, String introduction, MultipartHttpServletRequest multipartHttpServletRequest);
    UserPageDto getUserInfo(String email);

}
