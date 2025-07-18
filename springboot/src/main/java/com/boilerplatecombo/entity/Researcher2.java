package com.boilerplatecombo.entity;

import java.time.LocalDateTime;

public class Researcher2 {
    private Long id;
    private String name;
    private int age;
    private LocalDateTime createdAt;

    // Constructors, getters, setters
    public Researcher2() {}

    public Researcher2(Long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}