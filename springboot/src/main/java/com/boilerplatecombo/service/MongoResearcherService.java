package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.Researcher2;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.*;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MongoResearcherService {

    private final MongoTemplate mongoTemplate;

    public MongoResearcherService(@Qualifier("frosthandMongoTemplate") MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Researcher2> getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        Query query = new Query();

        if (filter != null && !filter.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(filter, "i"));
        }

        query.with(PageRequest.of(page, pageSize));
        query.with(Sort.by(ascending ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy));

        return mongoTemplate.find(query, Researcher2.class);
    }

    public Researcher2 getResearcherById(String id) {
        return mongoTemplate.findById(id, Researcher2.class);
    }

    public Researcher2 addResearcher(Researcher2 researcher) {
        return mongoTemplate.insert(researcher);
    }

    public boolean updateResearcher(Long id, Researcher2 updatedResearcher) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
                .set("name", updatedResearcher.getName())
                .set("age", updatedResearcher.getAge());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Researcher2.class);
        return result.getModifiedCount() > 0;
    }

    public boolean deleteResearcher(Long id) {
        Query query = new Query(Criteria.where("_id").is(id));
        DeleteResult result = mongoTemplate.remove(query, Researcher2.class);
        return result.getDeletedCount() > 0;
    }

    public String exportResearchersAsCsv() {
        List<Researcher2> researchers = mongoTemplate.findAll(Researcher2.class);
        StringBuilder csv = new StringBuilder("Id,Name,Age\n");
        for (Researcher2 r : researchers) {
            csv.append(String.format("%s,%s,%d\n",
                    escapeCsv(r.getId().toString()), escapeCsv(r.getName()), r.getAge()));
        }
        return csv.toString();
    }

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        return value;
    }
}
