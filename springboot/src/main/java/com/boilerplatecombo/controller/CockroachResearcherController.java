package com.boilerplatecombo.controller;

import com.boilerplatecombo.entity.cockroach.CockroachResearcher;
import com.boilerplatecombo.entity.cockroach.CockroachResearcherPage;
import com.boilerplatecombo.service.CockroachResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/cockroach/researcher")
public class CockroachResearcherController {

    private CockroachResearcherService service;

    public CockroachResearcherController(@Lazy CockroachResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<CockroachResearcherPage> getResearchers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam(required = false) String filter
    ) {
        return ResponseEntity.ok(service.getResearchers(page, pageSize, sortBy, ascending, filter));
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
    public ResponseEntity<CockroachResearcher> addResearcher(@RequestBody CockroachResearcher researcher) {
        CockroachResearcher added = service.addResearcher(researcher);
        return ResponseEntity.status(201).body(added);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateResearcher(@PathVariable Long id, @RequestBody CockroachResearcher researcher) {
        boolean updated = service.updateResearcher(id, researcher);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResearcher(@PathVariable Long id) {
        boolean deleted = service.deleteResearcher(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
