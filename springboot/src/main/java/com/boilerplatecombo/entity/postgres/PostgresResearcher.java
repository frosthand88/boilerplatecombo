package com.boilerplatecombo.entity.postgres;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "researcher")
public class
PostgresResearcher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime created_at;

    private String name;

    private Integer age;

    public PostgresResearcher() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.created_at = createdAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @PrePersist
    protected void onCreate() {
        this.created_at = LocalDateTime.now();
    }
}
