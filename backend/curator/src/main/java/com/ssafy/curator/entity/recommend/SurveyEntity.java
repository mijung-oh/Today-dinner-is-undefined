package com.ssafy.curator.entity.recommend;

import com.ssafy.curator.entity.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "survey")
@NoArgsConstructor
@AllArgsConstructor
public class SurveyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userId")
    UserEntity user;

    @NotNull
    String ingredients;

    @Column(columnDefinition = "varchar(100) default '요리 추천 부탁드려요'")
    String description;

    @CreationTimestamp
    Timestamp createDate;

    @UpdateTimestamp
    Timestamp updateDate;

}
