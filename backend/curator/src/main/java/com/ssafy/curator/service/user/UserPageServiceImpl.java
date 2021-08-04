package com.ssafy.curator.service.user;


import com.ssafy.curator.dto.post.MyPagePostDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.dto.user.UserPageDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
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
    public UserPageDto createUserInfo(String nickname, String introduction, MultipartHttpServletRequest multipartHttpServletRequest) {
        UserPageEntity userPageEntity = new UserPageEntity();
        UserEntity userEntity = userRepository.findByNickname(nickname);

        userPageEntity.setUser(userEntity);
        userPageEntity.setNickname(nickname);
        userPageEntity.setIntroduction(introduction);

        if (multipartHttpServletRequest == null) {
            userPageEntity.setProfileImg(null);
            userPageEntity.setBgImg(null);
        } else {
            MultipartFile multipartFile = multipartHttpServletRequest.getFile("profileImg");
            String profileImg = multipartFile.getOriginalFilename();
            userPageEntity.setProfileImg(profileImg);

            MultipartFile multipartFile2 = multipartHttpServletRequest.getFile("bgImg");
            String bgImg = multipartFile2.getOriginalFilename();
            userPageEntity.setBgImg(bgImg);
        }


        userPageRepository.save(userPageEntity);

        UserPageDto userPageDto = new ModelMapper().map(userPageEntity, UserPageDto.class);

        List<UserDto> userDtos = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowers()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollower(), UserDto.class);
            userDtos.add(o);
        }
        userPageDto.setFollowers(userDtos);

        List<UserDto> userDtos2 = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowings()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollowing(), UserDto.class);
            userDtos2.add(o);
        }
        userPageDto.setFollowings(userDtos2);

        return userPageDto;
    }

    @Override
    public UserPageDto getUserInfo(String nickname) {

        UserEntity userEntity = userRepository.findByNickname(nickname);

        UserPageEntity userPageEntity = userPageRepository.findByUser(userEntity);
        UserPageDto userPageDto = new UserPageDto();

        userPageDto.setIntroduction(userPageEntity.getIntroduction());
        userPageDto.setNickname(userPageEntity.getNickname());

        List<UserDto> userDtos = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowers()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollower(), UserDto.class);
            userDtos.add(o);
        }
        userPageDto.setFollowers(userDtos);

        List<UserDto> userDtos2 = new ArrayList<>();
        for (FollowingsEntity userEntity1 : userEntity.getFollowings()) {
            UserDto o = new ModelMapper().map(userEntity1.getFollowing(), UserDto.class);
            userDtos2.add(o);
        }
        userPageDto.setFollowings(userDtos2);

        userPageDto.setProfileImg(userPageEntity.getProfileImg());
        userPageDto.setBgImg(userPageEntity.getBgImg());

        // 게시글
        List<MyPagePostDto> myPagePostDtos = new ArrayList<>();
        for (PostEntity postEntity : postRepository.findByUserOrderByCreateDateDesc(userEntity)) {

            MyPagePostDto myPagePostDto = new MyPagePostDto();
            myPagePostDto.setTitle(postEntity.getTitle());
            myPagePostDto.setDescription(postEntity.getDescription());
            myPagePostDto.setIngredients(postEntity.getIngredients());
            myPagePostDto.setCreateDate(postEntity.getCreateDate());
            myPagePostDto.setImagePaths(postEntity.getImagePaths());

            myPagePostDtos.add(myPagePostDto);
        }

        userPageDto.setMyPagePostDtos(myPagePostDtos);
        return userPageDto;
    }


    @Override
    public String createNickname(String email, String nickname) {
        UserEntity userEntity = userRepository.findByEmail(email);

        // 처음 유저 닉네임 설정할 때 사진, 한줄소개 등등은 null값으로 일단 저장해놓기
        UserPageEntity userPageEntity = new UserPageEntity();

        userPageEntity.setUser(userEntity);
        userPageEntity.setNickname(nickname);
        userPageEntity.setIntroduction(null);
        userPageEntity.setProfileImg(null);
        userPageEntity.setBgImg(null);

        userPageRepository.save(userPageEntity);
        return "success";
    }


    @Override
    public String checkNickname(String nickname) {
        UserPageEntity userPageEntity = userPageRepository.findByNickname(nickname);

        // 닉네임을 가진 유저가 존재하지 않을 경우 success를 보내줌
        if (userPageEntity == null) return "success";
        else return "fail";
    }


    @Override
    public String updateUserInfo(String nickName, String introduction, MultipartFile multipartFile1, MultipartFile multipartFile2){
        UserEntity userEntity = userRepository.findByNickname(nickName);
        UserPageEntity userPageEntity = userPageRepository.findByUser(userEntity);


        if (nickName == "") {
            userPageEntity.setNickname(userPageEntity.getNickname());
        } else {
            userPageEntity.setNickname(nickName);
        }

        if (introduction == "") {
            userPageEntity.setIntroduction(userPageEntity.getIntroduction());
        } else {
            userPageEntity.setIntroduction(introduction);
        }

        if (multipartFile1 == null) {
            userPageEntity.setProfileImg(userPageEntity.getProfileImg());
        } else {
            userPageEntity.setProfileImg(multipartFile1.getOriginalFilename());
        }

        if (multipartFile2 == null) {
            userPageEntity.setBgImg(userPageEntity.getBgImg());
        } else {
            userPageEntity.setBgImg(multipartFile2.getOriginalFilename());
        }
        userPageRepository.save(userPageEntity);

        return "success";
    }

    @Override
    public boolean existsByNickname(String nickname) {
        return userPageRepository.existsByNickname(nickname);
    }
}
