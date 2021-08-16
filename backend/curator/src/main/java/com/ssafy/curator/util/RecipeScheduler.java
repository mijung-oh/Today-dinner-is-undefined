package com.ssafy.curator.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
@Slf4j
public class RecipeScheduler {

    private final String KEY = "recipeRanking";

    @Resource(name = "redisRankingTemplate")
    RedisTemplate<String, String> redisTemplate;

    @Scheduled(cron = "0 0 12 * * *")
    public void resetRanking(){
        log.info("> > > > > > > > 스케쥴러 실행");
        log.info("> > > > > > > > 일일 랭킹 삭제 시작");

        redisTemplate.delete(KEY);

        log.info("> > > > > > > > 일일 랭킹 삭제 완료");
        log.info("> > > > > > > > 스케쥴러 종료");
    }
}
