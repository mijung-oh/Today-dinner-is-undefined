package com.ssafy.curator.entity.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.curator.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Data
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userId")
    UserEntity user;

    @NotNull
    String title;

    @NotNull
    String description;

    @NotNull
    String ingredients;

    @CreationTimestamp
    Timestamp create_date;

    @UpdateTimestamp
    Timestamp update_date;

    @ElementCollection(targetClass=String.class)
    @CollectionTable(
            name = "post_image_path",
            joinColumns = @JoinColumn(name = "post_id"))
    List<String> imagePaths;


    // 게시글 좋아요
    @OneToMany(mappedBy = "postEntity")
    @JsonIgnore
    private List<PostLikeEntity> postLikeEntities = new ArrayList<>();

}
