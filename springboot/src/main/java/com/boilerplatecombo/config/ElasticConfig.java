package com.boilerplatecombo.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.elasticsearch", name = "required", havingValue = "true")
public class ElasticConfig {

    @Value("${app.datasources.elasticsearch.uri}")
    private String elasticUri;

    @Value("${app.datasources.elasticsearch.username}")
    private String username;

    @Value("${app.datasources.elasticsearch.password}")
    private String password;

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        RestClientBuilder builder = RestClient.builder(HttpHost.create(elasticUri))
                .setDefaultHeaders(new org.apache.http.Header[]{
                        // Basic Auth Header
                        new org.apache.http.message.BasicHeader(
                                "Authorization",
                                "Basic " + encodeBasicAuth(username, password)
                        )
                });

        RestClient restClient = builder.build();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(restClient, new co.elastic.clients.json.jackson.JacksonJsonpMapper());

        // And create the API client
        return new ElasticsearchClient(transport);
    }

    private String encodeBasicAuth(String username, String password) {
        String auth = username + ":" + password;
        return Base64.getEncoder().encodeToString(auth.getBytes());
    }
}
