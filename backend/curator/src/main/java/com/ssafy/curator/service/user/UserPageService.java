package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserPageDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface UserPageService {
    UserPageDto createUserInfo(String nickname, String introduction, MultipartHttpServletRequest multipartHttpServletRequest);
    UserPageDto getUserInfo(String nickname) throws IOException;
    String updateUserInfo(String nickName, String introduction, MultipartFile multipartFile1, MultipartFile multipartFile2) throws Exception;
    boolean existsByNickname(String nickname);
}
