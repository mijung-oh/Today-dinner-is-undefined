package com.ssafy.curator.controller.user;


import com.ssafy.curator.dto.user.UserDto;
import com.ssafy.curator.service.user.UserSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class UserSearchController {

    @Autowired
    private UserSearchService userSearchService;

    @GetMapping("/{username}")
    List<UserDto> searchUser(@PathVariable String username) {
        return userSearchService.searchUser(username);
    }
}
