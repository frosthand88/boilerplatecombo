package com.boilerplatecombo.entity.cockroach;

import java.util.List;

public class CockroachResearcherPage {
    private List<CockroachResearcher> data;
    private long totalCount;

    public CockroachResearcherPage(List<CockroachResearcher> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<CockroachResearcher> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }
}