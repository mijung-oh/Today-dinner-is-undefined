package com.ssafy.curator.entity.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "post_image")
@NoArgsConstructor
@AllArgsConstructor
public class PostImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "postId")
    PostEntity post;

    @NotNull
    String filename;

    @NotNull
    String fileOriName;

    @NotNull
    String filePath;

}
