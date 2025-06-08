package com.boilerplatecombo.config;

import io.lettuce.core.RedisClient;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.redis", name = "required", havingValue = "true")
public class RedisConfig {
    private final RedisConfigProps redisProps;

    public RedisConfig(RedisConfigProps redisProps) {
        this.redisProps = redisProps;
    }

    @Bean
    public RedisClient redisClient() {
        String uriWithPassword = redisProps.getUri();
        if (redisProps.getPassword() != null && !uriWithPassword.contains("@")) {
            uriWithPassword = uriWithPassword.replace("redis://", "redis://:" + redisProps.getPassword() + "@");
        }
        return RedisClient.create(uriWithPassword);
    }
}
