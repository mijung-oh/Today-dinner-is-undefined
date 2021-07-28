package com.ssafy.curator.dto.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.curator.entity.post.PostLikeEntity;
import com.ssafy.curator.entity.user.UserEntity;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Data
public class MyPagePostDto {

    String title;
    String description;
    String ingredients;

    String create_date;

    List<String> imagePaths;

}
