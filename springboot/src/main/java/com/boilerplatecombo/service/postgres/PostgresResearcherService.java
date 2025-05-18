package com.boilerplatecombo.service.postgres;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;
import com.boilerplatecombo.entity.postgres.ResearcherPage;
import com.boilerplatecombo.repo.postgres.PostgresResearcherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostgresResearcherService {

    //@Autowired
    private PostgresResearcherRepository repository;

    @Autowired
    private EntityManager entityManager;

    public PostgresResearcherService(@Lazy PostgresResearcherRepository repo) {
        this.repository = repo;
    }

    public ResearcherPage getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        // Base JPQL
        String baseJpql = "FROM PostgresResearcher r";
        String whereClause = "";
        if (filter != null && !filter.isBlank()) {
            whereClause = " WHERE r.name LIKE :filter";
        }

        // Query for results (with ORDER BY and pagination)
        String jpql = "SELECT r " + baseJpql + whereClause +
                " ORDER BY r." + sanitizeSortBy(sortBy) + (ascending ? " ASC" : " DESC");

        TypedQuery<PostgresResearcher> query = entityManager.createQuery(jpql, PostgresResearcher.class);
        if (!whereClause.isEmpty()) {
            query.setParameter("filter", "%" + filter + "%");
        }
        query.setFirstResult((page - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<PostgresResearcher> resultList = query.getResultList();

        // Separate COUNT query (without ORDER BY or pagination)
        String countJpql = "SELECT COUNT(r) " + baseJpql + whereClause;
        TypedQuery<Long> countQuery = entityManager.createQuery(countJpql, Long.class);
        if (!whereClause.isEmpty()) {
            countQuery.setParameter("filter", "%" + filter + "%");
        }
        Long totalCount = countQuery.getSingleResult();

        return new ResearcherPage(resultList, totalCount);
    }

    public long getTotalCount(String filter) {
        String jpql = "SELECT COUNT(r) FROM PostgresResearcher r";
        if (filter != null && !filter.isBlank()) {
            jpql += " WHERE r.name LIKE :filter";
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class);

        if (filter != null && !filter.isBlank()) {
            query.setParameter("filter", "%" + filter + "%");
        }

        return query.getSingleResult();
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
