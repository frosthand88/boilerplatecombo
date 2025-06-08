package com.boilerplatecombo.config;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.influxdb", name = "required", havingValue = "true")
public class InfluxConfig {
    private final InfluxProperties props;

    public InfluxConfig(InfluxProperties props) {
        this.props = props;
    }

    @Bean
    public InfluxDBClient influxClient() {
        return InfluxDBClientFactory.create(props.getUrl(), props.getPassword().toCharArray(), props.getOrg(), props.getBucket());
    }
}
