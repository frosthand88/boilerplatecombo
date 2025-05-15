package com.boilerplatecombo.controller.postgres;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;
import com.boilerplatecombo.repo.postgres.PostgresResearcherRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/postgres/researcher")
public class PostgresResearcherController {

    private final PostgresResearcherRepository repo;

    public PostgresResearcherController(PostgresResearcherRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<PostgresResearcher> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public PostgresResearcher create(@RequestBody PostgresResearcher item) {
        return repo.save(item);
    }

    @PutMapping("/{id}")
    public PostgresResearcher update(@PathVariable Long id, @RequestBody PostgresResearcher updated) {
        return repo.findById(id).map(existing -> {
//            existing.setName(updated.getName());
            return repo.save(existing);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
