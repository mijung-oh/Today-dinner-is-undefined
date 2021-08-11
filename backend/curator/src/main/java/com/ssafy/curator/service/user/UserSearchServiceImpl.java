package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserSearchServiceImpl implements UserSearchService{
    @Autowired
    private UserRepository userRepository;

    public List<UserDto> searchUser(String nickname) {
        List<UserEntity> users =  userRepository.findByNicknameContaining(nickname);
        List<UserDto> userDtos = new ArrayList<>();

        for (UserEntity o : users) {
            UserDto userDto = new ModelMapper().map(o, UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }
}
