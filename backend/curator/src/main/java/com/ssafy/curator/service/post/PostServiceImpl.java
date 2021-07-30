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
import com.ssafy.curator.repository.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Override
    public List<PostEntity> getLists(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        return postRepository.findByUser(userEntity);
    }

    public List<PostWithImageDto> getAllLists() {
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
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createDate = format.format(p.getCreate_date());
            String updateDate = format.format(p.getUpdate_date());
            pp.setCreateDate(createDate);
            pp.setUpdateDate(updateDate);
            pp.setImagePath(p.getImagePaths());
            pp.setComment(comments);
            postWithImageDto.add(pp);

        }
        return postWithImageDto;
    }

    private String rnd(String originName, byte[] fileData, String path) throws Exception {
        UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString() + "_" + originName;
        File target = new File(path, savedName);

        FileCopyUtils.copy(fileData, target);
        return savedName;
    }

    public String createPost(HttpServletRequest request, MultipartHttpServletRequest mtfRequest) throws Exception {

        PostEntity post = new PostEntity();
        String e = request.getParameter("email");
        UserEntity user = userRepository.findByEmail(e);
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

            String path = "src/main/resources/static/images/";
            String newFileName = rnd(originalName, f.getBytes(), path);
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

    public PostWithImageDto getPostById(@PathVariable("post_id") Long postId) throws Exception {
        PostEntity post = postRepository.findById(Math.toIntExact(postId));

        PostWithImageDto postWithImageDto = new PostWithImageDto();
        postWithImageDto.setTitle(post.getTitle());
        postWithImageDto.setId(post.getId());
        postWithImageDto.setDescription(post.getDescription());
        postWithImageDto.setIngredients(post.getIngredients());
        postWithImageDto.setUser(post.getUser());
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createDate = format.format(post.getCreate_date());
        String updateDate = format.format(post.getUpdate_date());
        postWithImageDto.setCreateDate(createDate);
        postWithImageDto.setUpdateDate(updateDate);
        postWithImageDto.setImagePath(post.getImagePaths());

        List<CommentEntity> Comments = commentRepository.findByPostId(Math.toIntExact(postId));

        List comments = new ArrayList();
        for (CommentEntity c : Comments) {
            comments.add(c);
        }

        postWithImageDto.setComment(comments);


        return postWithImageDto;
    }

    public PostEntity updatePost(@PathVariable("id") Long postId, PostEntity postDetails) throws Exception {
        PostEntity post = postRepository.findById(Math.toIntExact(postId));
        post.setTitle(postDetails.getTitle());
        post.setDescription(postDetails.getDescription());
        post.setIngredients(postDetails.getIngredients());

        PostEntity updatePost = postRepository.save(post);
        return updatePost;
    }

    public ResponseEntity deletePost(@PathVariable("post_id") Long postId) {
        PostEntity post = postRepository.findById(Math.toIntExact(postId));
        List<PostImageEntity> postImages = postImageRepository.findByPostId(Math.toIntExact(postId));
        List<CommentEntity> comments = commentRepository.findByPostId(Math.toIntExact(postId));
        commentRepository.deleteAll(comments);
        postImageRepository.deleteAll(postImages);
        postRepository.delete(post);

        return ResponseEntity.ok().build();

    }


}
