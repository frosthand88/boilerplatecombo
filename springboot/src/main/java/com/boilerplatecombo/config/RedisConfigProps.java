package com.boilerplatecombo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.datasources.redis")
public class RedisConfigProps {
    private boolean required;
    private String host;
    private int port;
    private String password;
    private int timeout;

    public RedisConfigProps() {
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTimeout() {
        return timeout;
    }

    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    @Override
    public String toString() {
        return "RedisConfigProps{" +
                "required=" + required +
                ", host='" + host + '\'' +
                ", port=" + port +
                ", password='******'" +
                ", timeout=" + timeout +
                '}';
    }

    public String getUri() {
        return String.format("redis://:%s@%s:%d", password, host, port);
    }
}
