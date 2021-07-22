package com.ssafy.curator.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Platform {
    GOOGLE("PLATFORM_GOOGLE","구글"),
    KAKAO("PLATFORM_KAKAO","카카오"),
    NAVER("PLATFORM_NAVER","네이버");

    private final String key;
    private final String title;
}
