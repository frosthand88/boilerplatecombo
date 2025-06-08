package com.boilerplatecombo.controller;

import com.boilerplatecombo.entity.Researcher2;
import com.boilerplatecombo.service.ElasticSearchResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/elasticsearch/researcher")
public class ElasticSearchResearcherController {

    private ElasticSearchResearcherService service;

    public ElasticSearchResearcherController(@Lazy ElasticSearchResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<List<Researcher2>> getResearchers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam(required = false) String filter
    ) {
        try {
            return ResponseEntity.ok(service.getResearchers(page, pageSize, sortBy, ascending, filter));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportResearchers() {
        byte[] csv = new byte[0];
        try {
            csv = service.exportResearchersAsCsv().getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=researchers.csv")
                .header("Content-Type", "text/csv")
                .body(csv);
    }

    @PostMapping
    public ResponseEntity<Researcher2> addResearcher(@RequestBody Researcher2 researcher) {
        Researcher2 added = null;
        try {
            added = service.addResearcher(researcher);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(201).body(added);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateResearcher(@PathVariable Long id, @RequestBody Researcher2 researcher) {
        boolean updated = false;
        try {
            updated = service.updateResearcher(id, researcher);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResearcher(@PathVariable Long id) {
        boolean deleted = false;
        try {
            deleted = service.deleteResearcher(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
