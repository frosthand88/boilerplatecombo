package com.boilerplatecombo.entity.postgres;

import java.util.List;

public class ResearcherPage {
    private List<PostgresResearcher> data;
    private long totalCount;

    public ResearcherPage(List<PostgresResearcher> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<PostgresResearcher> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }
}