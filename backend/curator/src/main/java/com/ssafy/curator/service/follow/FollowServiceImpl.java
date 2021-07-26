package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.follow.FollowRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FollowRepository followRepository;

//    @Autowired
//    public FollowServiceImpl(FollowRepository followRepository) {
//        this.followRepository = followRepository;
//    }


    @Override
    public String follow(String username, String followingEmail) {
        UserEntity currentUser = userRepository.findByName(username);
        UserEntity followingUser = userRepository.findByEmail(followingEmail);

        if (currentUser == null) {
            return "현재 유저가 존재하지 않습니다.";
        }
        if (followingUser == null) {
            return "해당 유저가 존재하지 않습니다.";
        }

        FollowingsEntity followingsEntity = new FollowingsEntity();

        followingsEntity.setFollower(currentUser);
        followingsEntity.setFollowing(followingUser);
        followRepository.save(followingsEntity);

        currentUser.getFollowings().add(followingUser);
        followingUser.getFollowers().add(currentUser);

        userRepository.save(currentUser);
        userRepository.save(followingUser);

        return "success";
    }


    @Override
    public List<UserDto> showFollowings(String followingEmail) {
        List<UserDto> userDtos = new ArrayList<>();
        UserEntity userEntity = userRepository.findByEmail(followingEmail);
        if (userEntity == null) {
            return null;
        }
        for (FollowingsEntity o : followRepository.findByFollowerId(userEntity.getId())) {
            UserDto userDto = new ModelMapper().map(o.getFollowing(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }

    @Override
    public List<UserDto> showFollowers(String followingEmail) {
        List<UserDto> userDtos = new ArrayList<>();
        UserEntity userEntity = userRepository.findByEmail(followingEmail);
        if (userEntity == null) {
            return null;
        }

        for (FollowingsEntity o : followRepository.findByFollowingId(userEntity.getId())) {
            UserDto userDto = new ModelMapper().map(o.getFollower(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }

    @Override
    public String deleteFollow(@RequestParam String username, @PathVariable String followingEmail) {
        UserEntity currentUser = userRepository.findByName(username);
        UserEntity followingUser = userRepository.findByEmail(followingEmail);

        if (currentUser == null) {
            return "현재 유저가 존재하지 않습니다.";
        }
        if (followingUser == null) {
            return "해당 유저가 존재하지 않습니다.";
        }

        FollowingsEntity followingsEntity = followRepository.findByFollowerAndFollowing(currentUser, followingUser);
        followRepository.deleteById(followingsEntity.getId());

        // UserEntity에서 삭제
        currentUser.getFollowings().remove(followingUser);
        followingUser.getFollowers().remove(currentUser);

        userRepository.save(currentUser);
        userRepository.save(followingUser);
        return "success";
    }

}
