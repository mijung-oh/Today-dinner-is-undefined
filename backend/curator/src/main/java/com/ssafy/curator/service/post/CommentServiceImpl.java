package com.ssafy.curator.service.post;


import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.post.CommentRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;


@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;


    public String createComment(HttpServletRequest request) throws Exception {
        CommentEntity comment = new CommentEntity();

        String e = request.getParameter("email");
        String p = request.getParameter("postId");

        UserEntity user = userRepository.findByEmail(e);
        PostEntity post = postRepository.findById(Long.parseLong(p));
        String content = request.getParameter("content");
        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(content);

        commentRepository.save(comment);

        return "success";
    }

    public CommentDto getCommentById(@PathVariable("post_id") Long postId, @PathVariable("comment_id") Long commentId) throws Exception {
        Long c = Long.parseLong(String.valueOf(commentId));
        CommentEntity comment = commentRepository.findById(c);

        CommentDto commentDto = new CommentDto();
        commentDto.setContent(comment.getContent());
        commentDto.setUser(comment.getUser());
        commentDto.setId(comment.getId());
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createDate = format.format(comment.getCreateDate());
        String updateDate = format.format(comment.getUpdateDate());
        commentDto.setCreateDate(createDate);
        commentDto.setUpdateDate(updateDate);

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
