package com.boilerplatecombo.entity.timescale;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "research_activity")
public class ResearchActivity {
    @Id
    private Long id = 1L; // Dummy value just to satisfy JPA

    private LocalDateTime time;
    private String researcher;
    private String paper;
    private String topic;
    private String conference;
    private String organization;
    private int citations;

    // Constructors
    public ResearchActivity() {}

    public ResearchActivity(LocalDateTime time, String researcher, String paper, String topic,
                            String conference, String organization, int citations) {
        this.time = time;
        this.researcher = researcher;
        this.paper = paper;
        this.topic = topic;
        this.conference = conference;
        this.organization = organization;
        this.citations = citations;
    }

    // Getters and Setters
    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getResearcher() {
        return researcher;
    }

    public void setResearcher(String researcher) {
        this.researcher = researcher;
    }

    public String getPaper() {
        return paper;
    }

    public void setPaper(String paper) {
        this.paper = paper;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getConference() {
        return conference;
    }

    public void setConference(String conference) {
        this.conference = conference;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public int getCitations() {
        return citations;
    }

    public void setCitations(int citations) {
        this.citations = citations;
    }
}
