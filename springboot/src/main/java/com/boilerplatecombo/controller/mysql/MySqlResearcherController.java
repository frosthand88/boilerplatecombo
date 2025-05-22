package com.boilerplatecombo.controller.mysql;

import com.boilerplatecombo.entity.mysql.MySqlResearcher;
import com.boilerplatecombo.entity.mysql.MySqlResearcherPage;
import com.boilerplatecombo.service.mysql.MySqlResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/mysql/researcher")
public class MySqlResearcherController {

    private MySqlResearcherService service;

    public MySqlResearcherController(@Lazy MySqlResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<MySqlResearcherPage> getResearchers(
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
    public ResponseEntity<MySqlResearcher> addResearcher(@RequestBody MySqlResearcher researcher) {
        MySqlResearcher added = service.addResearcher(researcher);
        return ResponseEntity.status(201).body(added);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateResearcher(@PathVariable Long id, @RequestBody MySqlResearcher researcher) {
        boolean updated = service.updateResearcher(id, researcher);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResearcher(@PathVariable Long id) {
        boolean deleted = service.deleteResearcher(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
