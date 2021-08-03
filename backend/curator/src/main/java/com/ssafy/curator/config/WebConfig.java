package com.ssafy.curator.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://*","https://*")
                .allowedOriginPatterns("http://*")
//                .allowedOrigins("http://127.0.0.1:9000", "http://localhost:9000", "http://127.0.0.1:3000", "http://localhost:3000",
//                                "http://i5c207.p.ssafy.io",".i5c207.p.ssafy.io",
//                                "http://i5c207.p.ssafy.io:9000","http://i5c207.p.ssafy.io:9000/",
//                                "http://i5c207.p.ssafy.io:3000","http://i5c207.p.ssafy.io:3000/")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name())
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(true);
    }
}
