package com.boilerplatecombo.entity.postgres;

import java.util.List;

public class PostgresResearcherPage {
    private List<PostgresResearcher> data;
    private long totalCount;

    public PostgresResearcherPage(List<PostgresResearcher> data, long totalCount) {
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