package com.ssafy.curator.service.post;

import com.ssafy.curator.dto.post.CommentDto;
import com.ssafy.curator.dto.post.PostWithImageDto;
import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.post.CommentEntity;
import com.ssafy.curator.entity.post.PostEntity;
import com.ssafy.curator.entity.post.PostImageEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.post.CommentRepository;
import com.ssafy.curator.repository.post.PostImageRepository;
import com.ssafy.curator.repository.post.PostRepository;
import com.ssafy.curator.repository.user.UserPageRepository;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.service.CommonService;
import org.apache.commons.io.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    PostImageRepository postImageRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommonService commonService;
    UserPageRepository userPageRepository;


    public List<PostWithImageDto> getAllLists() throws IOException {
        List<PostEntity> posts = postRepository.findAll();
        // 게시글 + 이미지
        List<PostWithImageDto> postWithImageDto = new ArrayList<>();

        for (PostEntity p : posts) {
            PostWithImageDto pp = new PostWithImageDto();
            List<CommentEntity> Comments = commentRepository.findByPostId(p.getId());

            List comments = new ArrayList();
            for (CommentEntity c : Comments) {
                CommentDto commentDto = new ModelMapper().map(c, CommentDto.class);
                comments.add(commentDto);
            }

            pp.setTitle(p.getTitle());
            pp.setDescription(p.getDescription());
            pp.setIngredients(p.getIngredients());
            pp.setId(p.getId());
            pp.setUser(p.getUser());
            pp.setCreateDate(p.getCreateDate());
            pp.setUpdateDate(p.getUpdateDate());

            String profileImage = userPageRepository.findByUser(p.getUser()).getProfileImg();
            pp.setProfileImage(commonService.imageEncoding(profileImage));


            List<String> imagePaths = p.getImagePaths();
            if (imagePaths.size() >= 1) {
                String firstImage = imagePaths.get(0);
                pp.setImagePath(Collections.singletonList(commonService.imageEncoding(firstImage)));
            } else {
                pp.setImagePath(p.getImagePaths());
            }

            pp.setComment(comments);

            postWithImageDto.add(pp);

        }
        return postWithImageDto;
    }


    public String createPost(HttpServletRequest request, MultipartHttpServletRequest mtfRequest) throws Exception {

        PostEntity post = new PostEntity();
        String n = request.getParameter("nickname");
        UserEntity user = userRepository.findByNickname(n);
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String ingredients = request.getParameter("ingredients");
        post.setUser(user);
        post.setTitle(title);
        post.setDescription(description);
        post.setIngredients(ingredients);

        List<MultipartFile> fileList = mtfRequest.getFiles("files");
        List<String> paths = new ArrayList();

        for (MultipartFile f : fileList) {

            PostImageEntity pi = new PostImageEntity();
            String originalName = f.getOriginalFilename();
            pi.setFileOriName(originalName);

//            String path = "src/main/resources/static/images/";
            String path = "/usr/local/images/";

            String newFileName = commonService.rnd(originalName, f.getBytes(), path);
            String newPath = path+newFileName;
            paths.add(newPath);

            pi.setFilename(newFileName);
            pi.setPost(post);
            postImageRepository.save(pi);
        }
        post.setImagePaths(paths);
        postRepository.save(post);



        return "success";
    }

    public PostWithImageDto getPostById(@PathVariable("post_id") Long postId) throws IOException {
        Long p = Long.parseLong(String.valueOf(postId));
        PostEntity post = postRepository.findById(p);

        PostWithImageDto postWithImageDto = new PostWithImageDto();
        postWithImageDto.setTitle(post.getTitle());
        postWithImageDto.setId(post.getId());
        postWithImageDto.setDescription(post.getDescription());
        postWithImageDto.setIngredients(post.getIngredients());
        postWithImageDto.setUser(post.getUser());
        postWithImageDto.setCreateDate(post.getCreateDate());
        postWithImageDto.setUpdateDate(post.getUpdateDate());
        String profileImage = userPageRepository.findByUser(post.getUser()).getProfileImg();
        postWithImageDto.setProfileImage(commonService.imageEncoding(profileImage));

        List<String> imageInfos = new ArrayList<String>();
        List<String> imagePaths = post.getImagePaths();
        for (String path : imagePaths) {
            imageInfos.add(commonService.imageEncoding(path));
        }

        postWithImageDto.setImagePath(imageInfos);

        List<CommentEntity> Comments = commentRepository.findByPostId(p);

        List comments = new ArrayList();
        for (CommentEntity c : Comments) {
            comments.add(c);
        }

        postWithImageDto.setComment(comments);


        return postWithImageDto;
    }

    public PostEntity updatePost(@PathVariable("id") Long postId, PostEntity postDetails, MultipartHttpServletRequest mtfRequest) throws Exception {
        Long p = Long.parseLong(String.valueOf(postId));

        PostEntity post = postRepository.findById(p);
        List<String> PathList = post.getImagePaths();
        for (String path : PathList) {
            File file = new File(path);
            file.delete();
        }
        List<PostImageEntity> postImages = postImageRepository.findByPostId(p);
        postImageRepository.deleteAll(postImages);

        post.setTitle(postDetails.getTitle());
        post.setDescription(postDetails.getDescription());
        post.setIngredients(postDetails.getIngredients());

        List<MultipartFile> fileList = mtfRequest.getFiles("files");
        List<String> paths = new ArrayList();

        for (MultipartFile f : fileList) {

            PostImageEntity pi = new PostImageEntity();
            String originalName = f.getOriginalFilename();
            pi.setFileOriName(originalName);

//            String path = "src/main/resources/static/images/";
            String path = "/usr/local/images/";
            String newFileName = commonService.rnd(originalName, f.getBytes(), path);
            String newPath = path+newFileName;
            paths.add(newPath);

            pi.setFilename(newFileName);
            pi.setPost(post);
            postImageRepository.save(pi);
        }
        post.setImagePaths(paths);

        PostEntity updatePost = postRepository.save(post);
        return updatePost;
    }

    public ResponseEntity deletePost(@PathVariable("post_id") Long postId) {
        Long p = Long.parseLong(String.valueOf(postId));
        PostEntity post = postRepository.findById(p);
        List<String> PathList = post.getImagePaths();
        for (String path : PathList) {
            File file = new File(path);
            file.delete();
        }
        List<PostImageEntity> postImages = postImageRepository.findByPostId(p);
        List<CommentEntity> comments = commentRepository.findByPostId(p);
        commentRepository.deleteAll(comments);
        postImageRepository.deleteAll(postImages);
        postRepository.delete(post);

        return ResponseEntity.ok().build();

    }

}
