package com.ssafy.curator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@EnableJpaAuditing
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 7200)
@EnableCaching
public class CuratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CuratorApplication.class, args);
    }

}
