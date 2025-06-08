package com.boilerplatecombo.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@ConditionalOnProperty(prefix = "app.datasources.mariadb", name = "required", havingValue = "true")
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.boilerplatecombo.repo.maria",
        entityManagerFactoryRef = "mariaEntityManagerFactory",
        transactionManagerRef = "mariaTransactionManager"
)
public class MariaConfig {

    @Bean(name = "mariaDataSource")
    @ConfigurationProperties(prefix = "app.datasources.mariadb")
    public DataSource mariaDataSource() {

        return DataSourceBuilder.create().build();
    }

    @Bean(name = "mariaEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean mariaEntityManagerFactory(
            @Qualifier("mariaDataSource") DataSource dataSource
    ) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.boilerplatecombo.entity.mysql");
        em.setPersistenceUnitName("maria");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Map<String, Object> props = new HashMap<>();
//        props.put("hibernate.hbm2ddl.auto", "update");
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        em.setJpaPropertyMap(props);

        return em;
    }

    @Bean
    public PlatformTransactionManager mariaTransactionManager(@Qualifier("mariaEntityManagerFactory") EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}
