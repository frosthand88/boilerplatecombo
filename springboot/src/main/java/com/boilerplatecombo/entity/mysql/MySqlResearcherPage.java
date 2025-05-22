package com.boilerplatecombo.entity.mysql;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;

import java.util.List;

public class MySqlResearcherPage {
    private List<MySqlResearcher> data;
    private long totalCount;

    public MySqlResearcherPage(List<MySqlResearcher> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<MySqlResearcher> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }
}