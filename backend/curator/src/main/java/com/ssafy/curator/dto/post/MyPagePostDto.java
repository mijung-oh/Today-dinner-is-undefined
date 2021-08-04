package com.ssafy.curator.dto.post;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class MyPagePostDto {
    String title;
    String description;
    String ingredients;
    Timestamp createDate;
    List<String> imagePaths;
}