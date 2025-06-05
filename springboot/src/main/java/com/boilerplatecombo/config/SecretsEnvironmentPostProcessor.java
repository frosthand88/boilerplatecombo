package com.boilerplatecombo.config;

import com.boilerplatecombo.service.AwsSecretsRetriever;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;

import java.util.HashMap;
import java.util.Map;

public class SecretsEnvironmentPostProcessor implements EnvironmentPostProcessor {
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, String> secrets = AwsSecretsRetriever.fetchSecrets();

        Map<String, Object> secretProps = new HashMap<>();
        secrets.forEach((dbName, password) -> {
            if (password != null && !password.isBlank()) {
                // Match exactly the spring boot datasource property keys you want to override
                String key = String.format("app.datasources.%s.password", dbName.toLowerCase());
                secretProps.put(key, password);
            }
        });

        MutablePropertySources propertySources = environment.getPropertySources();
        // Insert the new property source at highest priority (first)
        propertySources.addFirst(new MapPropertySource("awsSecrets", secretProps));
    }
}
