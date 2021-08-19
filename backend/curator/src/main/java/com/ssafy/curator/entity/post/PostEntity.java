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
    @Column(length=3000)
    String description;

    @NotNull
    @Column(length=3000)
    String ingredients;

    @CreationTimestamp
    Timestamp createDate;

    @UpdateTimestamp
    Timestamp updateDate;

    @OneToMany(mappedBy = "post", cascade=CascadeType.REMOVE)
    @JsonIgnore
    private List<PostImageEntity> postImageEntities = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade=CascadeType.REMOVE)
    @JsonIgnore
    private List<CommentEntity> commentEntities = new ArrayList<>();

    // 게시글 좋아요
    @OneToMany(mappedBy = "postEntity", cascade=CascadeType.REMOVE)
    @JsonIgnore
    private List<PostLikeEntity> postLikeEntities = new ArrayList<>();

}
