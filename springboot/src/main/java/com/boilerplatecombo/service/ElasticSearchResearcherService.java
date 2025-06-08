package com.boilerplatecombo.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.boilerplatecombo.entity.Researcher2;
import org.springframework.stereotype.Service;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ElasticSearchResearcherService {

    private final ElasticsearchClient client;
    private final String index = "researchers";

    public ElasticSearchResearcherService(ElasticsearchClient client) {
        this.client = client;
    }

    public List<Researcher2> getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) throws Exception {
        // Build the search request
        var searchRequestBuilder = client.search(s -> {
            s.index(index)
                    .from((page - 1) * pageSize)
                    .size(pageSize);

            if (sortBy != null && !sortBy.isEmpty()) {
                s.sort(sort -> sort.field(f -> f.field(sortBy).order(ascending ? SortOrder.Asc : SortOrder.Desc)));
            }

            if (filter != null && !filter.isEmpty()) {
                s.query(q -> q
                        .match(m -> m
                                .field("name")  // Assuming filtering on name
                                .query(filter)
                        ));
            }

            return s;
        }, Researcher2.class);

        List<Researcher2> researchers = new ArrayList<>();
        for (Hit<Researcher2> hit : searchRequestBuilder.hits().hits()) {
            researchers.add(hit.source());
        }
        return researchers;
    }

    public Researcher2 getResearcherById(int id) throws Exception {
        GetResponse<Researcher2> response = client.get(g -> g.index(index).id(String.valueOf(id)), Researcher2.class);
        return response.found() ? response.source() : null;
    }

    public Researcher2 addResearcher(Researcher2 researcher) throws Exception {
        IndexResponse response = client.index(i -> i.index(index).id(String.valueOf(researcher.getId())).document(researcher));
        if (response.result().name().equals("Created") || response.result().name().equals("Updated")) {
            return researcher;
        }
        return null;
    }

    public boolean updateResearcher(Long id, Researcher2 updatedResearcher) throws Exception {
        UpdateResponse<Researcher2> response = client.update(u -> u.index(index)
                .id(String.valueOf(id))
                .doc(updatedResearcher)
                .docAsUpsert(true), Researcher2.class);
        return response.result().name().equals("Updated") || response.result().name().equals("Created");
    }

    public boolean deleteResearcher(Long id) throws Exception {
        DeleteResponse response = client.delete(d -> d.index(index).id(String.valueOf(id)));
        return response.result().name().equals("Deleted");
    }

    public String exportResearchersAsCsv() throws Exception {
        // Export all researchers as CSV
        var searchResponse = client.search(s -> s.index(index).size(10000), Researcher2.class); // max 10k docs, for bigger use scroll API

        StringWriter writer = new StringWriter();
        writer.append("Id,Name,Age\n");

        for (Hit<Researcher2> hit : searchResponse.hits().hits()) {
            Researcher2 r = hit.source();
            writer.append(escapeCsv(r.getId().toString())).append(",");
            writer.append(escapeCsv(r.getName())).append(",");
            writer.append(escapeCsv("" + r.getAge())).append("\n");
        }

        return writer.toString();
    }

    private String escapeCsv(String value) {
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }
}
