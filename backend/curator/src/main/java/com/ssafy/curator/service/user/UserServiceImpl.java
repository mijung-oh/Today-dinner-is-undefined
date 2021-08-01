package com.ssafy.curator.service.user;

import com.ssafy.curator.dto.Platform;
import com.ssafy.curator.dto.Role;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    ModelMapper mapper = new ModelMapper();
    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Override
    public UserDto getUserByUserEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        if(userEntity == null)
            throw new UsernameNotFoundException(email);
        UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);
        return userDto;
    }

    @Override
    public void createPlatformUser(UserDto userDto, String platform) {
        // to convert java.lang.String to java.lang.Long. 에러  -->  MatchingStrategies.STRICT
        userDto.setUserId(UUID.randomUUID().toString());
        UserEntity userEntity = mapper.map(userDto, UserEntity.class);
        userEntity.setRole(Role.USER);
        switch(platform){
            case "GOOGLE":
                userEntity.setPlatform(Platform.GOOGLE);
                break;
            case "KAKAO":
                userEntity.setPlatform(Platform.KAKAO);
                break;
            case "NAVER":
                userEntity.setPlatform(Platform.NAVER);
                break;
        }
        userRepository.save(userEntity);
    }

    @Override
    public boolean existUser(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existUserNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


}
