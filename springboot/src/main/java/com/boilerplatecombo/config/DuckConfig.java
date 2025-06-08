package com.boilerplatecombo.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.duckdb", name = "required", havingValue = "true")
public class DuckConfig {
    @Bean(name = "duckDataSource")
    @ConfigurationProperties(prefix = "app.datasources.duckdb")
    public DataSource duckDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "duckJdbcTemplate")
    public JdbcTemplate duckJdbcTemplate(@Qualifier("duckDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}