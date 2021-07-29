package com.ssafy.curator.controller.post;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.post.PostLikeRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.service.post.PostLikeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("like")
public class PostLikeController {

    @Autowired
    PostLikeRepository postLikeRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostLikeService postLikeService;

    // 좋아요 누르기
    @PostMapping("/{postId}")
    String like(@RequestParam String email, @PathVariable int postId) {
        return postLikeService.like(email, postId);
    }

    // 좋아요 한 사람들 리스트
    @GetMapping("/{postId}/list")
    List<UserDto> likeUserList(@PathVariable int postId) {
        return postLikeService.likeUserList(postId);
    }

    // 좋아요 취소
    @DeleteMapping("/{postId}")
    String deleteLike(@RequestParam String email, @PathVariable int postId) {
        return postLikeService.deleteLike(email, postId);
    }

    // 유저가 받은 모든 게시물의 좋아요 수
//    @GetMapping("/{userId}/likeCounts")
//    Integer getLikeCount(@PathVariable int userId){
//        int likeCounts = 0;
//
//        // 유저가 작성한 모든 게시글 불러와서
//        boardRepository.findAllById(userId)
//        // 그 게시글의 좋아요를 더해서 반환
//    }
}
