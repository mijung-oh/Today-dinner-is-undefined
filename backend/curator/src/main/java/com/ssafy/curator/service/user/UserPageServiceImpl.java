package com.ssafy.curator.service.user;


import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.entity.user.UserPageEntity;
import com.ssafy.curator.repository.user.UserPageRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Service
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserPageRepository userPageRepository;

    @Override
    public String createUserInfo(String email, String nickName, String introduction, MultipartHttpServletRequest multipartHttpServletRequest) {
        UserPageEntity userPageEntity = new UserPageEntity();
        UserEntity userEntity = userRepository.findByEmail(email);

        userPageEntity.setUser(userEntity);
        userPageEntity.setNickName(nickName);
        userPageEntity.setIntroduction(introduction);

        MultipartFile multipartFile = multipartHttpServletRequest.getFile("profileImg");
        String profileImg = multipartFile.getOriginalFilename();
        userPageEntity.setProfileImg(profileImg);

        MultipartFile multipartFile2 = multipartHttpServletRequest.getFile("bgImg");
        String bgImg = multipartFile.getOriginalFilename();
        userPageEntity.setBgImg(bgImg);
        userPageRepository.save(userPageEntity);

        return "success";
    }

    @Override
    public UserPageDto getUserInfo(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        UserPageEntity userPageEntity = userPageRepository.findByUser(userEntity);

        UserPageDto userPageDto = new ModelMapper().map(userPageEntity, UserPageDto.class);
        return userPageDto;
    }

}
