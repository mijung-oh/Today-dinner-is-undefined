package com.ssafy.curator.dto.user;

import com.ssafy.curator.dto.post.MyPagePostDto;
import com.ssafy.curator.dto.post.PostWithImageDto;
import lombok.Data;
import java.util.List;

@Data
public class UserPageDto {
    String nickName;
    String introduction;
    List<UserDto> followings;
    List<UserDto> followers;
    String profileImg;
    String bgImg;
    List<MyPagePostDto> myPagePostDtos;
}
