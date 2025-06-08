package com.boilerplatecombo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.datasources.influxdb")
public class InfluxProperties {
    private String url;
    private String password;
    private String org;
    private String bucket;

    // Getter and Setter for url
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    // Getter and Setter for password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter for org
    public String getOrg() {
        return org;
    }
    public void setOrg(String org) {
        this.org = org;
    }

    // Getter and Setter for bucket
    public String getBucket() {
        return bucket;
    }
    public void setBucket(String bucket) {
        this.bucket = bucket;
    }
}
