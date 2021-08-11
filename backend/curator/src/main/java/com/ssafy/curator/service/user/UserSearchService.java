package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;
import java.util.List;

public interface UserSearchService {
    List<UserDto> searchUser(String ninkname);
}
