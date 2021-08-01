package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserPageDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface UserPageService {
    UserPageDto createUserInfo(String nickname, String introduction, MultipartHttpServletRequest multipartHttpServletRequest);
    UserPageDto getUserInfo(String nickname);

    String createNickname(String email, String nickname);

    String checkNickname(String nickname);
    String updateUserInfo(String nickName, String introduction, MultipartFile multipartFile1, MultipartFile multipartFile2);

    boolean existsByNickname(String nickname);
}
