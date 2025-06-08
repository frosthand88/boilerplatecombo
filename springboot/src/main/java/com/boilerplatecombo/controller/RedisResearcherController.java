package com.boilerplatecombo.controller;

import com.boilerplatecombo.entity.Researcher2;
import com.boilerplatecombo.service.RedisResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/redis/researcher")
public class RedisResearcherController {

    private RedisResearcherService service;

    public RedisResearcherController(@Lazy RedisResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<CompletableFuture<Map<String, String>>> getResearchers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam(required = false) String filter
    ) {
        return ResponseEntity.ok(service.getResearcherByIdAsync(1));
    }

    @PostMapping
    public ResponseEntity<String> addResearcher(@RequestBody Researcher2 researcher) {
        service.addResearcherAsync(researcher);
        return ResponseEntity.status(201).body("");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateResearcher(@PathVariable int id, @RequestBody Researcher2 researcher) {
        CompletableFuture<Long> updated = service.updateResearcherAsync(id, researcher);
        return ResponseEntity.status(200).body("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResearcher(@PathVariable int id) {
        CompletableFuture<Boolean> deleted = service.deleteResearcherAsync(id);
        return ResponseEntity.status(200).body("");
    }
}
