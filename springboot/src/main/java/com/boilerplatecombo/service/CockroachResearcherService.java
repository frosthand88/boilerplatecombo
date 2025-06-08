package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.cockroach.CockroachResearcher;
import com.boilerplatecombo.entity.cockroach.CockroachResearcherPage;
import com.boilerplatecombo.repo.cockroach.CockroachResearcherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CockroachResearcherService {

    //@Autowired
    private CockroachResearcherRepository repository;

    @PersistenceContext(unitName = "cockroachEntityManagerFactory")
    private EntityManager entityManager;

    public CockroachResearcherService(@Lazy CockroachResearcherRepository repo) {
        this.repository = repo;
    }

    public CockroachResearcherPage getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // SELECT query
        CriteriaQuery<CockroachResearcher> cq = cb.createQuery(CockroachResearcher.class);
        Root<CockroachResearcher> root = cq.from(CockroachResearcher.class);

        if (filter != null && !filter.isBlank()) {
            cq.where(cb.like(root.get("name"), "%" + filter + "%"));
        }

        // Sorting
        if (ascending) {
            cq.orderBy(cb.asc(root.get(sanitizeSortBy(sortBy))));
        } else {
            cq.orderBy(cb.desc(root.get(sanitizeSortBy(sortBy))));
        }

        TypedQuery<CockroachResearcher> query = entityManager.createQuery(cq);
        query.setFirstResult((page - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<CockroachResearcher> resultList = query.getResultList();

        // COUNT query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<CockroachResearcher> countRoot = countQuery.from(CockroachResearcher.class);
        countQuery.select(cb.count(countRoot));

        if (filter != null && !filter.isBlank()) {
            countQuery.where(cb.like(countRoot.get("name"), "%" + filter + "%"));
        }

        Long totalCount = entityManager.createQuery(countQuery).getSingleResult();

        return new CockroachResearcherPage(resultList, totalCount);
    }
    
    public Optional<CockroachResearcher> getResearcherById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public CockroachResearcher addResearcher(CockroachResearcher researcher) {
        researcher.setCreatedAt(LocalDateTime.now());
        return repository.save(researcher);
    }

    @Transactional
    public boolean updateResearcher(Long id, CockroachResearcher updated) {
        Optional<CockroachResearcher> optional = repository.findById(id);
        if (optional.isEmpty()) return false;

        CockroachResearcher existing = optional.get();
        existing.setName(updated.getName());

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
        List<CockroachResearcher> list = repository.findAll();
        StringBuilder sb = new StringBuilder("Id,CreatedAt,Name,Age\n");

        for (CockroachResearcher r : list) {
            sb.append(r.getId()).append(",")
                    .append(r.getCreatedAt()).append(",")
                    .append(escapeCsv(r.getName())).append(",")
                    .append("\n");
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
