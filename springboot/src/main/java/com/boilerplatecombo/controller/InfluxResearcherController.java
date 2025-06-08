package com.boilerplatecombo.controller;

import com.boilerplatecombo.service.InfluxResearcherService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/influx/researcher")
public class InfluxResearcherController {

    private InfluxResearcherService service;

    public InfluxResearcherController(@Lazy InfluxResearcherService researcherService) {
        this.service = researcherService;
    }

    @GetMapping
    public ResponseEntity<String> getResearchers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam(required = false) String filter
    ) {
        service.queryResearchers();
        return ResponseEntity.ok().body("");
    }
}
