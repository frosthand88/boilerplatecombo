package com.boilerplatecombo.config;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.InetSocketAddress;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.cassandra", name = "required", havingValue = "true")
public class CassandraConfig {

    @Bean
    public CqlSession cassandraSession() {
        return CqlSession.builder()
                .addContactPoint(new InetSocketAddress("host.docker.internal", 9042))
                .withLocalDatacenter("datacenter1") // 👈 this is the required fix
                .withKeyspace("benchmark_keyspace")
                .build();
    }
}
