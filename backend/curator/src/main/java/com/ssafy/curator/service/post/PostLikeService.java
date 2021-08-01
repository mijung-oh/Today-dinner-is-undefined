package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.user.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

public interface PostLikeService {
    String like(String userNickname, int postId);

    // 좋아요 한 사람들 리스트
    List<UserDto> likeUserList(int postId);

    // 좋아요 취소
    String deleteLike(String userNickname, int postId);
}
