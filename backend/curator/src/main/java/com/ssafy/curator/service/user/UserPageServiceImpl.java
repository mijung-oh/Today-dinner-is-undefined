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
import org.springframework.util.FileCopyUtils;
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

        String curProfile = userPageEntity.getProfileImg();
        if (curProfile != null) {
            InputStream imageStream = new FileInputStream(curProfile);
            byte[] imageByteArray = IOUtils.toByteArray(imageStream);
            String base64data = Base64.getEncoder().encodeToString(imageByteArray);
            imageStream.close();
            String ProfileImg = "data:image/png;base64," + base64data;

            userPageDto.setProfileImg(ProfileImg);
        } else {
            userPageDto.setProfileImg(null);
        }

        String curBg = userPageEntity.getBgImg();
        if (curBg != null){
            InputStream imageStream2 = new FileInputStream(curBg);
            byte[] imageByteArray2 = IOUtils.toByteArray(imageStream2);
            String base64data2 = Base64.getEncoder().encodeToString(imageByteArray2);
            imageStream2.close();
            String BgImg = "data:image/png;base64," + base64data2;

            userPageDto.setBgImg(BgImg);
        } else {
            userPageDto.setBgImg(null);
        }

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
                byte[] imageByteArray3 = IOUtils.toByteArray(imageStream3);
                String base64data3 = Base64.getEncoder().encodeToString(imageByteArray3);
                imageStream3.close();
                String imageInfo = "data:image/png;base64," + base64data3;

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
    public String updateUserInfo(String nickName, String introduction, MultipartFile multipartFile1, MultipartFile multipartFile2) throws Exception {
        UserEntity userEntity = userRepository.findByNickname(nickName);
        if (userEntity == null) {
            return "유저가 존재하지 않습니다.";
        }
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

        if (!multipartFile1.isEmpty()) {
//            File pre = new File(userPageEntity.getProfileImg());
//            pre.delete();
            String path = "/usr/local/images/";
            String newFileName = rnd(multipartFile1.getOriginalFilename(), multipartFile1.getBytes(), path);
            String newPath = path+newFileName;
            userPageEntity.setProfileImg(newPath);
            File dest = new File(newPath);
            try {
                multipartFile1.transferTo(dest);
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 배경사진
        if (!multipartFile2.isEmpty()) {
            String path = "/usr/local/images/";
            String newFileName = rnd(multipartFile2.getOriginalFilename(), multipartFile2.getBytes(), path);
            String newPath = path+newFileName;
            userPageEntity.setBgImg(newPath);
            File dest = new File(newPath);
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

    private String rnd(String originName, byte[] fileData, String path) throws Exception {
        UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString() + "_" + originName;
        File target = new File(path, savedName);

        FileCopyUtils.copy(fileData, target);
        return savedName;
    }
}
