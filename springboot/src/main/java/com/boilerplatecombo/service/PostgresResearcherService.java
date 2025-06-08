package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;
import com.boilerplatecombo.entity.postgres.PostgresResearcherPage;
import com.boilerplatecombo.repo.postgres.PostgresResearcherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostgresResearcherService {

    //@Autowired
    private PostgresResearcherRepository repository;

    @PersistenceContext(unitName = "postgresEntityManagerFactory")
    private EntityManager entityManager;

    public PostgresResearcherService(@Lazy PostgresResearcherRepository repo) {
        this.repository = repo;
    }

    public PostgresResearcherPage getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // SELECT query
        CriteriaQuery<PostgresResearcher> cq = cb.createQuery(PostgresResearcher.class);
        Root<PostgresResearcher> root = cq.from(PostgresResearcher.class);

        if (filter != null && !filter.isBlank()) {
            cq.where(cb.like(root.get("name"), "%" + filter + "%"));
        }

        // Sorting
        if (ascending) {
            cq.orderBy(cb.asc(root.get(sanitizeSortBy(sortBy))));
        } else {
            cq.orderBy(cb.desc(root.get(sanitizeSortBy(sortBy))));
        }

        TypedQuery<PostgresResearcher> query = entityManager.createQuery(cq);
        query.setFirstResult((page - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<PostgresResearcher> resultList = query.getResultList();

        // COUNT query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<PostgresResearcher> countRoot = countQuery.from(PostgresResearcher.class);
        countQuery.select(cb.count(countRoot));

        if (filter != null && !filter.isBlank()) {
            countQuery.where(cb.like(countRoot.get("name"), "%" + filter + "%"));
        }

        Long totalCount = entityManager.createQuery(countQuery).getSingleResult();

        return new PostgresResearcherPage(resultList, totalCount);
    }

    public Optional<PostgresResearcher> getResearcherById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public PostgresResearcher addResearcher(PostgresResearcher researcher) {
        researcher.setCreatedAt(LocalDateTime.now());
        return repository.save(researcher);
    }

    @Transactional
    public boolean updateResearcher(Long id, PostgresResearcher updated) {
        Optional<PostgresResearcher> optional = repository.findById(id);
        if (optional.isEmpty()) return false;

        PostgresResearcher existing = optional.get();
        existing.setName(updated.getName());
        existing.setAge(updated.getAge());

        repository.save(existing);
        return true;
    }

    @Transactional
    public boolean deleteResearcher(Long id) {
        if (!repository.existsById(id)) return false;

        repository.deleteById(id);
        return true;
    }

    public String exportResearchersAsCsv() {
        List<PostgresResearcher> list = repository.findAll();
        StringBuilder sb = new StringBuilder("Id,CreatedAt,Name,Age\n");

        for (PostgresResearcher r : list) {
            sb.append(r.getId()).append(",")
                    .append(r.getCreatedAt()).append(",")
                    .append(escapeCsv(r.getName())).append(",")
                    .append(r.getAge()).append("\n");
        }

        return sb.toString();
    }

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }

    private String sanitizeSortBy(String sortBy) {
        return switch (sortBy.toLowerCase()) {
            case "name", "age", "created_at" -> sortBy;
            default -> "id";
        };
    }
}
