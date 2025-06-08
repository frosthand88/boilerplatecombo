package com.boilerplatecombo.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.mongodb", name = "required", havingValue = "true")
public class MongoConfig {
    @Bean(name = "frosthandMongoClient")
    @ConfigurationProperties(prefix = "app.datasources.mongodb")
    public MongoProperties frosthandMongoProperties() {
        return new MongoProperties();
    }

    @Bean(name = "frosthandMongoTemplate")
    public MongoTemplate frosthandMongoTemplate() {
        MongoProperties props = frosthandMongoProperties();

        ConnectionString connectionString = new ConnectionString(props.getUri());
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();

        MongoClient mongoClient = MongoClients.create(settings);
        return new MongoTemplate(mongoClient, "current_weather");
    }

    public static class MongoProperties {
        private String host;
        private String username;
        private String password;
        private String database;

        // Getters and setters
        public String getUri() {
            return String.format("mongodb://%s:%s@%s/%s?authSource=admin", username, password, host, database);
        }

        public String getHost() {
            return host;
        }
        public void setHost(String host) {
            this.host = host;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
        public String getDatabase() {
            return database;
        }

        public void setDatabase(String database) {
            this.database = database;
        }
    }
}
