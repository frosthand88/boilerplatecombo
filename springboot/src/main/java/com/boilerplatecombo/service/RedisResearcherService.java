package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.Researcher2;
import io.lettuce.core.api.async.RedisAsyncCommands;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.RedisClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class RedisResearcherService {
    private final RedisAsyncCommands<String, String> asyncCommands;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RedisResearcherService(RedisClient redisClient) {
        StatefulRedisConnection<String, String> connection = redisClient.connect();
        this.asyncCommands = connection.async();
    }

    public CompletableFuture<Map<String, String>> getResearcherByIdAsync(int id) {
        String keyPrefix = "researcher:" + id;
        return asyncCommands.hgetall(keyPrefix).toCompletableFuture();
    }

    public CompletableFuture<Void> addResearcherAsync(Researcher2 researcher) {
        String keyPrefix = "researcher:" + researcher.getId();
        Map<String, String> map = new HashMap<>();
        map.put("name", researcher.getName());
        map.put("age", String.valueOf(researcher.getAge()));
        return asyncCommands.hset(keyPrefix, map).toCompletableFuture().thenAccept(x -> {});
    }

    public CompletableFuture<Long> updateResearcherAsync(int id, Researcher2 updatedResearcher) {
        String keyPrefix = "researcher:" + id;
        return asyncCommands.hset(keyPrefix, Map.of(
                "name", updatedResearcher.getName(),
                "age", String.valueOf(updatedResearcher.getAge())
        )).toCompletableFuture();
    }

    public CompletableFuture<Boolean> deleteResearcherAsync(int id) {
        String keyPrefix = "researcher:" + id;
        return asyncCommands.del(keyPrefix).toCompletableFuture().thenApply(deleted -> deleted > 0);
    }

    public CompletableFuture<String> exportResearchersAsCsvAsync(List<Integer> ids) {
        List<CompletableFuture<Map<String, String>>> futures = new ArrayList<>();
        for (int id : ids) {
            futures.add(getResearcherByIdAsync(id));
        }

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> {
                    StringBuilder csv = new StringBuilder("Id,Name,Age\n");
                    for (int i = 0; i < ids.size(); i++) {
                        int id = ids.get(i);
                        Map<String, String> data = futures.get(i).join();
                        csv.append(String.format("%d,%s,%s\n",
                                id,
                                escapeCsv(data.getOrDefault("name", "")),
                                data.getOrDefault("age", "")));
                    }
                    return csv.toString();
                });
    }

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }
}
