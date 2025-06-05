package com.boilerplatecombo.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication(scanBasePackages = "com.boilerplatecombo")
public class BoilerplateSpringbootApplication {

	public static void main(String[] args) {
		// Load .env variables into actual system environment
		Dotenv dotenv = Dotenv.configure().load();

		// Set them as system properties so they’re visible to AWS SDK
		dotenv.entries().forEach(entry -> {
			String key = entry.getKey();
			String value = entry.getValue();

			if ("AWS_ACCESS_KEY_ID".equals(key)) {
				System.setProperty("aws.accessKeyId", value);
			} else if ("AWS_SECRET_ACCESS_KEY".equals(key)) {
				System.setProperty("aws.secretAccessKey", value);
			} else if ("AWS_REGION".equals(key)) {
				System.setProperty("AWS_REGION", value);  // keep region as is
			} else {
				System.setProperty(key, value);
			}
		});

		SpringApplication.run(BoilerplateSpringbootApplication.class, args);
	}

}
