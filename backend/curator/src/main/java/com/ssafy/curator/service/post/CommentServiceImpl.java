package com.ssafy.curator.service.post;


import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.post.CommentRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;


    public ResponseEntity createComment(@PathVariable("post_id") Long postId, HttpServletRequest request) throws Exception {
        CommentEntity comment = new CommentEntity();

        String n = request.getParameter("nickname");
        String content = request.getParameter("content");

        UserEntity user = userRepository.findByNickname(n);
        PostEntity post = postRepository.findById(postId);

        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(content);

        commentRepository.save(comment);

        return ResponseEntity.ok().build();
    }

    public List<CommentDto> getCommentList(@PathVariable("post_id") Long postId) throws Exception {
        List<CommentEntity> Comments = commentRepository.findByPostId(postId);

        List comments = new ArrayList();
        for (CommentEntity c : Comments) {
            CommentDto commentDto = new ModelMapper().map(c, CommentDto.class);
            comments.add(commentDto);
        }
        return comments;
    }

    public CommentDto getCommentById(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception {
        Long c = Long.parseLong(String.valueOf(commentId));
        CommentEntity comment = commentRepository.findById(c);

        CommentDto commentDto = new CommentDto();
        commentDto.setContent(comment.getContent());
        commentDto.setUser(comment.getUser());
        commentDto.setId(comment.getId());
        commentDto.setCreateDate(comment.getCreateDate());
        commentDto.setUpdateDate(comment.getUpdateDate());

        return commentDto;
    }

    public CommentEntity updateComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId, CommentEntity commentDetails) throws Exception {
        Long c = Long.parseLong(String.valueOf(commentId));
        CommentEntity comment = commentRepository.findById(c);
        comment.setContent(commentDetails.getContent());

        CommentEntity updateComment = commentRepository.save(comment);
        return updateComment;
    }

    public ResponseEntity deleteComment(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception {
        Long c = Long.parseLong(String.valueOf(commentId));
        CommentEntity comment = commentRepository.findById(c);
        commentRepository.delete(comment);
        return ResponseEntity.ok().build();
    }

}
