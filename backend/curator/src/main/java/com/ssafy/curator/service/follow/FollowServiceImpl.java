package com.ssafy.curator.service.follow;

import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.entity.follow.FollowingsEntity;
import com.ssafy.curator.entity.user.UserEntity;
import com.ssafy.curator.repository.follow.FollowRepository;
import com.ssafy.curator.repository.user.UserRepository;
import com.ssafy.curator.vo.user.RequestAlarm;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FollowServiceImpl implements FollowService {

    UserRepository userRepository;
    FollowRepository followRepository;

    @Autowired
    public FollowServiceImpl(UserRepository userRepository, FollowRepository followRepository) throws IOException {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        FileInputStream serviceAccount = null;
        FirebaseOptions options = null;
        try {
            serviceAccount = new FileInputStream("/usr/local/images/curation-ba2c2-firebase-adminsdk-gl2mk-740878546b.json");
        } catch (IOException e){
            serviceAccount = new FileInputStream("src/main/resources/static/images/curation-ba2c2-firebase-adminsdk-gl2mk-740878546b.json");
        }finally {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://curation-ba2c2.firebaseio.com")
                    .build();
            FirebaseApp.initializeApp(options);
        }


    }

    @Override
    public String follow(String userNickname, String followingNickname) throws ExecutionException, InterruptedException {
        UserEntity currentUser = userRepository.findByNickname(userNickname);
        UserEntity followingUser = userRepository.findByNickname(followingNickname);

        if (currentUser == null) {
            return "현재 유저가 존재하지 않습니다.";
        }
        if (followingUser == null) {
            return "해당 유저가 존재하지 않습니다.";
        }

        FollowingsEntity followingsEntity = new FollowingsEntity();

        followingsEntity.setFollower(currentUser);
        followingsEntity.setFollowing(followingUser);
        followRepository.save(followingsEntity);

        push(userNickname, followingNickname);

        return "success";
    }


    @Override
    public List<UserDto> showFollowings(String nickname) {

        List<UserDto> userDtos = new ArrayList<>();
        UserEntity userEntity = userRepository.findByNickname(nickname);
        if (userEntity == null) {
            return null;
        }
        for (FollowingsEntity o : userEntity.getFollowings()) {
            UserDto userDto = new ModelMapper().map(o.getFollowing(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }


    @Override
    public List<UserDto> showFollowers(String nickname) {
        List<UserDto> userDtos = new ArrayList<>();
        UserEntity userEntity = userRepository.findByNickname(nickname);
        if (userEntity == null) {
            return null;
        }
        for (FollowingsEntity o : userEntity.getFollowers()) {
            UserDto userDto = new ModelMapper().map(o.getFollower(), UserDto.class);
            userDtos.add(userDto);
        }

        return userDtos;
    }

    @Override
    public String deleteFollow(@RequestParam String userNickname, @PathVariable String followingNickname) {
        UserEntity currentUser = userRepository.findByNickname(userNickname);
        UserEntity followingUser = userRepository.findByNickname(followingNickname);

        if (currentUser == null) {
            return "현재 유저가 존재하지 않습니다.";
        }
        if (followingUser == null) {
            return "해당 유저가 존재하지 않습니다.";
        }

        FollowingsEntity followingsEntity = followRepository.findByFollowerAndFollowing(currentUser, followingUser);
        followRepository.deleteById(followingsEntity.getId());

        return "success";
    }

    public void push(String user, String following) throws ExecutionException, InterruptedException {
        String me = user;
        String target = following;

        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Follow").document(target);
        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        List<String> arr;
        if (document.exists()) {
            System.out.println("Document data: " + document.getData().get("follower"));
            arr = (List<String>) document.getData().get("follower");
        }
        else arr = new ArrayList<>();

        if(arr.contains(me)) return;

        arr.add(me);
        Map<String, List> input = new HashMap<>();
        input.put("follower", arr);
        ApiFuture<WriteResult> apiFuture = db
                .collection("Follow")
                .document(target)
                .set(input, SetOptions.merge());
    }

    @Override
    public void checkout(RequestAlarm alarm) throws ExecutionException, InterruptedException {
        String me = alarm.getUser();
        String target = alarm.getTarget();

        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Follow").document(me);
        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        List<String> arr = (List<String>) document.getData().get("follower");

        System.out.println("Document data: " + document.getData().get("follower"));

        arr.remove(arr.indexOf(target));
        Map<String, List> input = new HashMap<>();
        input.put("follower", arr);
        ApiFuture<WriteResult> apiFuture = db
                .collection("Follow")
                .document(me)
                .set(input, SetOptions.merge());
    }
}
