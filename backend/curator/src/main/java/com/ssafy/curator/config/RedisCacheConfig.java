package com.ssafy.curator.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.curator.dto.recipe.RecipeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
@EnableCaching
@EnableRedisRepositories
@RequiredArgsConstructor
public class RedisCacheConfig extends CachingConfigurerSupport {
    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.cache.port}")
    private int redisCachePort;

    @Bean
    public RedisConnectionFactory redisCacheConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(redisHost);
        redisStandaloneConfiguration.setPort(redisCachePort);
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(
                redisStandaloneConfiguration);

        return lettuceConnectionFactory;
    }

    @Override
    public CacheManager cacheManager() {
        RedisCacheManager.RedisCacheManagerBuilder builder = RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisCacheConnectionFactory());
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer(objectMapper())))
                .entryTtl(Duration.ofHours(5L));

        builder.cacheDefaults(configuration);
        return  builder.build();
    }

    // jackson LocalDateTime mapper
    @Bean public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
        mapper.registerModules(new JavaTimeModule(), new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
        return mapper;
    }

    @Bean(name = "redisCacheTemplate")
    public RedisTemplate<String, RecipeDto> redisCacheTemplate() {
        RedisTemplate<String, RecipeDto> template = new RedisTemplate<String, RecipeDto>();
        template.setConnectionFactory(redisCacheConnectionFactory());
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper()));
        return template;
    }

}
