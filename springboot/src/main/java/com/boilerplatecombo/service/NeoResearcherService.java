package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.Researcher2;
import org.neo4j.driver.*;
import org.neo4j.driver.Record;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NeoResearcherService {

    private final Driver driver;

    public NeoResearcherService(Driver driver) {
        this.driver = driver;
    }

    public List<Researcher2> getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        List<Researcher2> researchers = new ArrayList<>();

        try (Session session = driver.session(SessionConfig.forDatabase("neo4j"))) {
            // Example query — you can add pagination, sorting, filtering here
            String cypher = "MATCH (p:Person) RETURN p.name as name, p.age as age SKIP $skip LIMIT $limit";

            Result result = session.run(cypher,
                    Values.parameters("skip", (page - 1) * pageSize, "limit", pageSize));

            while (result.hasNext()) {
                Record record = result.next();
                Researcher2 r = new Researcher2();
                r.setName(record.get("name").asString());
                r.setAge(record.get("age").asInt());
                researchers.add(r);
            }
        }
        return researchers;
    }

    public Researcher2 getResearcherById(int id) {
        // Implement lookup by id if you have an ID property in Neo4j node
        return null;
    }

    public Researcher2 addResearcher(Researcher2 researcher) {
        try (Session session = driver.session()) {
            session.writeTransaction(tx -> {
                tx.run("CREATE (p:Person {name: $name, age: $age})",
                        Values.parameters("name", researcher.getName(), "age", researcher.getAge()));
                return null;
            });
        }
        return researcher;
    }

    public boolean updateResearcher(Long id, Researcher2 updatedResearcher) {
        try (Session session = driver.session()) {
            session.writeTransaction(tx -> {
                tx.run("MATCH (p:Person {id: $id}) SET p.name = $name, p.age = $age",
                        Values.parameters("id", id, "name", updatedResearcher.getName(), "age", updatedResearcher.getAge()));
                return null;
            });
        }
        return true;
    }

    public boolean deleteResearcher(Long id) {
        try (Session session = driver.session()) {
            session.writeTransaction(tx -> {
                tx.run("MATCH (p:Person {id: $id}) DELETE p", Values.parameters("id", id));
                return null;
            });
        }
        return true;
    }

    public String exportResearchersAsCsv() {
        StringBuilder csv = new StringBuilder("Name,Age\n");

        try (Session session = driver.session()) {
            Result result = session.run("MATCH (p:Person) RETURN p.name as name, p.age as age");
            while (result.hasNext()) {
                Record record = result.next();
                csv.append(escapeCsv(record.get("name").asString()))
                        .append(",")
                        .append(record.get("age").asInt())
                        .append("\n");
            }
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
}
