package com.boilerplatecombo.service;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.PreparedStatement;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class CassandraResearcherService {

    //@Autowired
    private final CqlSession session;

    public CassandraResearcherService(CqlSession session) {
        this.session = session;
    }

    public void createKeyspaceAndTables() {
        // Create keyspace
        String createKeyspace = """
            CREATE KEYSPACE IF NOT EXISTS benchmark_keyspace
            WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
        """;

        session.execute(createKeyspace);

        // Use the new keyspace
//        session.setKeyspace(CqlIdentifier.fromCql("benchmark_keyspace"));

        // Create table
        String createTable = """
            CREATE TABLE IF NOT EXISTS researchers (
                researcher_id UUID PRIMARY KEY,
                name TEXT,
                created_at TIMESTAMP,
                age INT
            );
        """;

        session.execute(createTable);

        System.out.println("Keyspace and tables created successfully.");
    }

    public void addResearchersBulk() {
        Random rand = new Random();
        String insertQuery = """
            INSERT INTO researchers (researcher_id, name, created_at, age)
            VALUES (?, ?, ?, ?);
        """;

        PreparedStatement prepared = session.prepare(insertQuery);

        for (int i = 0; i < 1000; i++) {
            session.execute(prepared.bind(
                    UUID.randomUUID(),
                    "Name " + rand.nextInt(10000),
                    Instant.now().plusSeconds(3600),
                    rand.nextInt(30) + 20
            ));
        }

        System.out.println("Inserted 1000 random records.");
    }

    public List<Map<String, Object>> getResearchers() {
        ResultSet rs = session.execute("SELECT * FROM researchers");

        List<Map<String, Object>> researchers = new ArrayList<>();

        for (Row row : rs) {
            Map<String, Object> researcher = new HashMap<>();
            researcher.put("researcher_id", row.getUuid("researcher_id"));
            researcher.put("name", row.getString("name"));
            researcher.put("created_at", row.getInstant("created_at"));
            researcher.put("age", row.getInt("age"));
            researchers.add(researcher);
        }

        return researchers;
    }

    // Placeholder methods matching your original structure
    public Map<String, Object> getResearcherById(UUID id) {
        return null;
    }

    public boolean updateResearcher(UUID id, Map<String, Object> updatedResearcher) {
        return true;
    }

    public boolean deleteResearcher(UUID id) {
        return true;
    }

    public String exportResearchersAsCsv() {
        return "";
    }

    private String escapeCsv(String value) {
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }
}
