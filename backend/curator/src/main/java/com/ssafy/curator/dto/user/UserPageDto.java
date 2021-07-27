package com.ssafy.curator.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserPageDto {
    String nickName;
    String introduction;

    List<UserDto> followings;
    List<UserDto> followers;

    List<PostWithImageDto> postWithImageDtos;
}
