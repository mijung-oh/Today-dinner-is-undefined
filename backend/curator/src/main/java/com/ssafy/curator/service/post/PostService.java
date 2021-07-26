package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.entity.post.PostEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface PostService {
    List<PostEntity> getLists(String email);
    List<PostWithImageDto> getAllLists();
    String createPost(HttpServletRequest request, MultipartHttpServletRequest mtfRequest) throws Exception;
    PostWithImageDto getPostById(@PathVariable("post_id") Long postId) throws Exception;
    PostEntity updatePost(@PathVariable("id") Long postId, PostEntity postDetails) throws Exception;
    ResponseEntity<?> deletePost(@PathVariable("post_id") Long postId) throws Exception;

}
