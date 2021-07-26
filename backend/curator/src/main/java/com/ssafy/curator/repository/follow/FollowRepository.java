package com.ssafy.curator.repository.follow;

import com.ssafy.curator.entity.follow.FollowingsEntity;
import com.ssafy.curator.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<FollowingsEntity, Long> {
    List<FollowingsEntity> findByFollowerId(Long followerId);

    List<FollowingsEntity> findByFollowingId(Long followerId);

    FollowingsEntity findByFollowerAndFollowing(UserEntity follower, UserEntity following);
}