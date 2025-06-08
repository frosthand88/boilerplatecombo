package com.boilerplatecombo.config;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.neo4j", name = "required", havingValue = "true")
public class NeoConfig {
    @Value("${app.datasources.neo4j.uri}")
    private String uri;

    @Value("${app.datasources.neo4j.username}")
    private String username;

    @Value("${app.datasources.neo4j.password}")
    private String password;

    @Bean
    public Driver neo4jDriver() {
        return GraphDatabase.driver(uri, AuthTokens.basic(username, password));
    }
}
