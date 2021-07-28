package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserSearchServiceImpl implements UserSearchService{
    @Autowired
    private UserRepository userRepository;

    public List<UserDto> searchUser(String username) {
        List<UserEntity> users =  userRepository.findByNameContaining(username);
        List<UserDto> userDtos = new ArrayList<>();

        for (UserEntity o : users) {
            UserDto userDto = new ModelMapper().map(o, UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }
}
