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
import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

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
    public UserPageDto getUserInfo(String nickname) throws IOException {

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

        InputStream imageStream = new FileInputStream(userPageEntity.getProfileImg());
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        String base64data = Base64.getEncoder().encodeToString(imageByteArray);
        imageStream.close();
        String ProfileImg = "data:image/png;base64," + base64data;

        userPageDto.setProfileImg(ProfileImg);

        InputStream imageStream2 = new FileInputStream(userPageEntity.getBgImg());
        byte[] imageByteArray2 = IOUtils.toByteArray(imageStream2);
        String base64data2 = Base64.getEncoder().encodeToString(imageByteArray2);
        imageStream2.close();
        String BgImg = "data:image/png;base64," + base64data2;

        userPageDto.setBgImg(BgImg);

        // 게시글
        List<MyPagePostDto> myPagePostDtos = new ArrayList<>();
        for (PostEntity postEntity : postRepository.findByUserOrderByCreateDateDesc(userEntity)) {

            MyPagePostDto myPagePostDto = new MyPagePostDto();
            myPagePostDto.setTitle(postEntity.getTitle());
            myPagePostDto.setDescription(postEntity.getDescription());
            myPagePostDto.setIngredients(postEntity.getIngredients());
            myPagePostDto.setCreateDate(postEntity.getCreateDate());
            List<String> imagePaths = postEntity.getImagePaths();
            if (imagePaths.size() >= 1) {
                String firstImage = imagePaths.get(0);
                InputStream imageStream3 = new FileInputStream(firstImage);
                byte[] imageByteArray3 = IOUtils.toByteArray(imageStream);
                String base64data3 = Base64.getEncoder().encodeToString(imageByteArray);
                imageStream.close();
                String imageInfo = "data:image/png;base64," + base64data;

                myPagePostDto.setImagePaths(Collections.singletonList(imageInfo));
            } else {
                myPagePostDto.setImagePaths(postEntity.getImagePaths());
            }

            myPagePostDtos.add(myPagePostDto);
        }

        userPageDto.setMyPagePostDtos(myPagePostDtos);
        return userPageDto;
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
        // 프로필
        File pre = new File(userPageEntity.getProfileImg());
        pre.delete();
        Date date = new Date();
        StringBuilder sb1 = new StringBuilder();
        if (multipartFile1.isEmpty()) {
            sb1.append("none");
        } else {
            sb1.append(date.getTime());
            sb1.append(multipartFile1.getOriginalFilename());
        }

        if (!multipartFile1.isEmpty()) {
            String profileImg = "/home/ubuntu/CURATION/S05P13C207/backend/curator/src/main/resources/static/images/" + sb1.toString();
            userPageEntity.setProfileImg(profileImg);
            File dest = new File(profileImg);
            try {
                multipartFile1.transferTo(dest);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 배경사진
        File pre2 = new File(userPageEntity.getBgImg());
        pre2.delete();
        StringBuilder sb2 = new StringBuilder();
        if (multipartFile2.isEmpty()) {
            sb2.append("none");
        } else {
            sb2.append(date.getTime());
            sb2.append(multipartFile2.getOriginalFilename());
        }

        if (!multipartFile2.isEmpty()) {
            String bgImg = "/home/ubuntu/CURATION/S05P13C207/backend/curator/src/main/resources/static/images/" + sb2.toString();
            userPageEntity.setBgImg(bgImg);
            File dest = new File(bgImg);
            try {
                multipartFile2.transferTo(dest);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        userPageRepository.save(userPageEntity);
        return "success";
    }

    @Override
    public boolean existsByNickname(String nickname) {
        return userPageRepository.existsByNickname(nickname);
    }
}