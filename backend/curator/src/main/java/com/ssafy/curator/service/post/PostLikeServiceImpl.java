package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.post.PostLikeRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostLikeServiceImpl implements PostLikeService{

    @Autowired
    PostLikeRepository postLikeRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;


    public String like(String username, int postId) {
        PostEntity postEntity = postRepository.findById(postId);
        UserEntity userEntity = userRepository.findByName(username);

        PostLikeEntity postLikeEntity = new PostLikeEntity();
        postLikeEntity.setPostEntity(postEntity);
        postLikeEntity.setUserEntity(userEntity);

        postLikeRepository.save(postLikeEntity);

        postEntity.addPostLikeEntity(postLikeEntity);
        userEntity.addPostLikeEntity(postLikeEntity);

        postRepository.save(postEntity);
        userRepository.save(userEntity);

        return "success";
    }

    // 좋아요 한 사람들 리스트
    public List<UserDto> likeUserList(int postId) {
        List<UserDto> userDtos = new ArrayList<>();

        PostEntity postEntity = postRepository.findById(postId);
        List<PostLikeEntity> likeEntities = postEntity.getPostLikeEntities();
        for (PostLikeEntity o : likeEntities) {
            UserDto userDto = new ModelMapper().map(o.getUserEntity(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }

    // 좋아요 취소
    public String deleteLike(String username, int postId) {
        PostEntity postEntity = postRepository.findById(postId);
        UserEntity userEntity = userRepository.findByName(username);

        postLikeRepository.deleteByUserEntityAndPostEntity(userEntity, postEntity);

        return "success";
    }

}
