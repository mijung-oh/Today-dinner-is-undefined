package com.ssafy.curator.dto.post;

import lombok.Data;
import java.util.List;

@Data
public class MyPagePostDto {
    String title;
    String description;
    String ingredients;
    String create_date;
    List<String> imagePaths;
}
