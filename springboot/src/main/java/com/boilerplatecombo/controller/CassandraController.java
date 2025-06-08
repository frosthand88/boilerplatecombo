package com.boilerplatecombo.controller;

import com.boilerplatecombo.entity.mssql.MsSqlResearcher;
import com.boilerplatecombo.service.CassandraResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/cassandra/researcher")
public class CassandraController {

    private CassandraResearcherService service;

    public CassandraController(@Lazy CassandraResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getResearchers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam(required = false) String filter
    ) {
        return ResponseEntity.ok(service.getResearchers());
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportResearchers() {
        byte[] csv = service.exportResearchersAsCsv().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=researchers.csv")
                .header("Content-Type", "text/csv")
                .body(csv);
    }

    @PostMapping
    public ResponseEntity<String> addResearcher(@RequestBody MsSqlResearcher researcher) {
        service.addResearchersBulk();
        return ResponseEntity.status(201).body("");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateResearcher(@PathVariable UUID id, @RequestBody MsSqlResearcher researcher) {
        boolean updated = service.updateResearcher(id, null);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResearcher(@PathVariable UUID id) {
        boolean deleted = service.deleteResearcher(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
