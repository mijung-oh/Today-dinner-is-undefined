package com.ssafy.curator.service.user;


import com.ssafy.curator.dto.post.MyPagePostDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.entity.user.UserPageEntity;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserPageRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserPageServiceImpl implements UserPageService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserPageRepository userPageRepository;

    @Autowired
    PostRepository postRepository;

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
<<<<<<< HEAD
=======
        UserPageDto userPageDto = new UserPageDto();

        userPageDto.setIntroduction(userPageEntity.getIntroduction());
        userPageDto.setNickName(userPageEntity.getNickName());

        List<UserDto> userDtos = new ArrayList<>();
        for (UserEntity userEntity1 : userEntity.getFollowers()) {
            UserDto o = new ModelMapper().map(userEntity1, UserDto.class);
            userDtos.add(o);
        }
        userPageDto.setFollowers(userDtos);
>>>>>>> 2f62e1200521173230b7ac2ea07c3a648b7b879b

        List<UserDto> userDtos2 = new ArrayList<>();
        for (UserEntity userEntity1 : userEntity.getFollowings()) {
            UserDto o = new ModelMapper().map(userEntity1, UserDto.class);
            userDtos2.add(o);
        }
        userPageDto.setFollowings(userDtos2);

        userPageDto.setProfileImg(userPageEntity.getProfileImg());
        userPageDto.setBgImg(userPageEntity.getBgImg());

        // 게시글
        List<MyPagePostDto> myPagePostDtos = new ArrayList<>();
        for (PostEntity postEntity : postRepository.findByUser(userEntity)) {

            MyPagePostDto myPagePostDto = new MyPagePostDto();
            myPagePostDto.setTitle(postEntity.getTitle());
            myPagePostDto.setDescription(postEntity.getDescription());
            myPagePostDto.setIngredients(postEntity.getIngredients());
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createDate = format.format(postEntity.getCreate_date());
            myPagePostDto.setCreate_date(createDate);

            myPagePostDto.setImagePaths(postEntity.getImagePaths());

            myPagePostDtos.add(myPagePostDto);
        }

        userPageDto.setMyPagePostDtos(myPagePostDtos);
        return userPageDto;
    }

}
