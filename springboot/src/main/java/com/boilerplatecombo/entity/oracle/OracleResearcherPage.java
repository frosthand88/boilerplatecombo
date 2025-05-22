package com.boilerplatecombo.entity.oracle;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;

import java.util.List;

public class OracleResearcherPage {
    private List<OracleResearcher> data;
    private long totalCount;

    public OracleResearcherPage(List<OracleResearcher> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    public List<OracleResearcher> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }
}