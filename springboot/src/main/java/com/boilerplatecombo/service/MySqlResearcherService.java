package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.mysql.MySqlResearcher;
import com.boilerplatecombo.entity.mysql.MySqlResearcherPage;
import com.boilerplatecombo.repo.mysql.MySqlResearcherRepository;
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
public class MySqlResearcherService {

    //@Autowired
    private MySqlResearcherRepository repository;

    @PersistenceContext(unitName = "mysqlEntityManagerFactory")
    private EntityManager entityManager;

    public MySqlResearcherService(@Lazy MySqlResearcherRepository repo) {
        this.repository = repo;
    }

    public MySqlResearcherPage getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // SELECT query
        CriteriaQuery<MySqlResearcher> cq = cb.createQuery(MySqlResearcher.class);
        Root<MySqlResearcher> root = cq.from(MySqlResearcher.class);

        if (filter != null && !filter.isBlank()) {
            cq.where(cb.like(root.get("name"), "%" + filter + "%"));
        }

        // Sorting
        if (ascending) {
            cq.orderBy(cb.asc(root.get(sanitizeSortBy(sortBy))));
        } else {
            cq.orderBy(cb.desc(root.get(sanitizeSortBy(sortBy))));
        }

        TypedQuery<MySqlResearcher> query = entityManager.createQuery(cq);
        query.setFirstResult((page - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<MySqlResearcher> resultList = query.getResultList();

        // COUNT query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<MySqlResearcher> countRoot = countQuery.from(MySqlResearcher.class);
        countQuery.select(cb.count(countRoot));

        if (filter != null && !filter.isBlank()) {
            countQuery.where(cb.like(countRoot.get("name"), "%" + filter + "%"));
        }

        Long totalCount = entityManager.createQuery(countQuery).getSingleResult();

        return new MySqlResearcherPage(resultList, totalCount);
    }
    
    public Optional<MySqlResearcher> getResearcherById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public MySqlResearcher addResearcher(MySqlResearcher researcher) {
        researcher.setCreatedAt(LocalDateTime.now());
        return repository.save(researcher);
    }

    @Transactional
    public boolean updateResearcher(Long id, MySqlResearcher updated) {
        Optional<MySqlResearcher> optional = repository.findById(id);
        if (optional.isEmpty()) return false;

        MySqlResearcher existing = optional.get();
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
        List<MySqlResearcher> list = repository.findAll();
        StringBuilder sb = new StringBuilder("Id,CreatedAt,Name,Age\n");

        for (MySqlResearcher r : list) {
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
