package com.ssafy.curator.entity.user;

import com.ssafy.curator.dto.Platform;
import com.ssafy.curator.dto.Role;
import com.ssafy.curator.entity.BaseTimeEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel
@Table(name = "users")
public class UserEntity extends BaseTimeEntity {
    @Id @GeneratedValue
    @ApiModelProperty(value="Key value")
    private Long id;

    @Column
    @ApiModelProperty(value = "UUID 식별자", required = true)
    private String userId;

    @Email(message = "이메일 형식을 입력해주세요")
    @Column(unique = true)
    @ApiModelProperty(value = "사용자 이메일", required = true)
    private String email;

    @Size(min = 2, message = "닉네임은 2자 이상입니다.")
    @Column
    @ApiModelProperty(value = "사용자 닉네임", required = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Platform platform;

}
