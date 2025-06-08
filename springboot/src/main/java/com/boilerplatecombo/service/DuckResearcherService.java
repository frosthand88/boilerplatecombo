package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.Researcher2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class DuckResearcherService {

    private final JdbcTemplate jdbcTemplate;

    public DuckResearcherService(@Qualifier("duckJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Researcher2> rowMapper = (rs, rowNum) -> {
        Researcher2 r = new Researcher2();
        r.setId(rs.getLong("id"));
        r.setName(rs.getString("name"));
        Timestamp ts = rs.getTimestamp("created_at");
        if (ts != null) {
            r.setCreatedAt(ts.toLocalDateTime());
        }
        return r;
    };

    public List<Researcher2> getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        String orderDirection = ascending ? "ASC" : "DESC";
        String filterClause = (filter != null && !filter.isEmpty()) ? " WHERE name LIKE ? " : "";
        String sql = String.format("SELECT * FROM research_activity %s ORDER BY %s %s LIMIT ? OFFSET ?",
                filterClause, sortBy, orderDirection);

        Object[] params;
        if (!filterClause.isEmpty()) {
            params = new Object[]{"%" + filter + "%", pageSize, (page - 1) * pageSize};
        } else {
            params = new Object[]{pageSize, (page - 1) * pageSize};
        }

        List<Researcher2> researchers = jdbcTemplate.query(sql, params, rowMapper);

        String countSql = filterClause.isEmpty() ?
                "SELECT COUNT(*) FROM research_activity" :
                "SELECT COUNT(*) FROM research_activity WHERE name LIKE ?";

        int totalCount;
        if (!filterClause.isEmpty()) {
            totalCount = jdbcTemplate.queryForObject(countSql, new Object[]{"%" + filter + "%"}, Integer.class);
        } else {
            totalCount = jdbcTemplate.queryForObject(countSql, Integer.class);
        }

        return researchers;
    }

    public Researcher2 getResearcherById(long id) {
        String sql = "SELECT * FROM research_activity WHERE id = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, rs -> {
            if (rs.next()) {
                return rowMapper.mapRow(rs, 1);
            }
            return null;
        });
    }

    public Researcher2 addResearcher(Researcher2 researcher) {
        String sql = "INSERT INTO research_activity (name, created_at) VALUES (?, ?)";
        jdbcTemplate.update(sql, researcher.getName(), Timestamp.valueOf(researcher.getCreatedAt()));
        // DuckDB does not support RETURN_GENERATED_KEYS via JdbcTemplate directly, so fetch last inserted id:
        Long id = jdbcTemplate.queryForObject("SELECT last_insert_rowid()", Long.class);
        researcher.setId(id != null ? id : 0);
        return researcher;
    }

    public boolean updateResearcher(long id, Researcher2 updatedResearcher) {
        String sql = "UPDATE research_activity SET name = ?, created_at = ? WHERE id = ?";
        int updated = jdbcTemplate.update(sql, updatedResearcher.getName(), Timestamp.valueOf(updatedResearcher.getCreatedAt()), id);
        return updated > 0;
    }

    public boolean deleteResearcher(long id) {
        String sql = "DELETE FROM research_activity WHERE id = ?";
        int deleted = jdbcTemplate.update(sql, id);
        return deleted > 0;
    }

    public String exportResearchersAsCsv() {
        StringBuilder csv = new StringBuilder("Id,CreatedAt,Name\n");
        String sql = "SELECT * FROM research_activity";

        List<Researcher2> researchers = jdbcTemplate.query(sql, rowMapper);
        for (Researcher2 r : researchers) {
            csv.append(r.getId()).append(",")
                    .append(r.getCreatedAt()).append(",")
                    .append(escapeCsv(r.getName()))
                    .append("\n");
        }
        return csv.toString();
    }

    private String escapeCsv(String value) {
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }

    public static class Result<T> {
        private final T data;
        private final int totalCount;

        public Result(T data, int totalCount) {
            this.data = data;
            this.totalCount = totalCount;
        }

        public T getData() { return data; }
        public int getTotalCount() { return totalCount; }
    }
}