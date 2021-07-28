package com.ssafy.curator.controller.post;


import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.repository.post.PostImageRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.service.post.*;
import com.ssafy.curator.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private CommentServiceImpl commentService;


    @GetMapping("/list")
    public List<PostWithImageDto> getAllPosts() {
        return postService.getAllLists();
    }

    @PostMapping("/list")
    public String createPost(HttpServletRequest request, MultipartHttpServletRequest mtfRequest) throws Exception {
        return postService.createPost(request, mtfRequest);
    }


    @GetMapping("/{post_id}")
    PostWithImageDto getPostById(@PathVariable("post_id") Long postId) throws Exception{
        return postService.getPostById(postId);
    }


    @PutMapping("/{id}")
    public PostEntity updatePost(@PathVariable("id") Long postId, PostEntity postDetails) throws Exception{
        return postService.updatePost(postId, postDetails);
    }


    @DeleteMapping("/{post_id}")
    public ResponseEntity deletePost(@PathVariable("post_id") Long postId) throws Exception{
        return postService.deletePost(postId);
    }

    @PostMapping("/{post_id}/commentList")
    public String createComment(HttpServletRequest request) throws Exception {
        return commentService.createComment(request);
    }

    @GetMapping("/{post_id}/commentList/{comment_id}")
    public CommentDto getCommentById(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception {
        return commentService.getCommentById(postId, commentId);

    }

    @PutMapping("/{post_id}/commentList/{comment_id}")
    public CommentEntity updateComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId, CommentEntity commentDetails) throws Exception {
        return commentService.updateComment(postId, commentId, commentDetails);
    }

    @DeleteMapping("/{post_id}/commentList/{comment_id}")
    public ResponseEntity deleteComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception {
        return commentService.deleteComment(postId, commentId);
    }

    @GetMapping("/by/{user_email}")
    public List<PostEntity> getLists(@PathVariable("user_email") String email) {
        return postService.getLists(email);
    }


}

