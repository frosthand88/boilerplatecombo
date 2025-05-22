package com.boilerplatecombo.entity.mssql;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;

import java.util.List;

public class MsSqlResearcherPage {
    private List<MsSqlResearcher> data;
    private long totalCount;

    public MsSqlResearcherPage(List<MsSqlResearcher> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<MsSqlResearcher> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }
}