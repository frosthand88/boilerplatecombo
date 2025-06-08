package com.boilerplatecombo.service;

import com.boilerplatecombo.entity.timescale.ResearchActivity;
import com.boilerplatecombo.repo.timescale.TimescaleResearcherRepository;
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
public class TimescaleResearcherService {

    //@Autowired
    private TimescaleResearcherRepository repository;

    @PersistenceContext(unitName = "timescaleEntityManagerFactory")
    private EntityManager entityManager;

    public TimescaleResearcherService(@Lazy TimescaleResearcherRepository repo) {
        this.repository = repo;
    }

    public ResearchActivity getResearchers(int page, int pageSize, String sortBy, boolean ascending, String filter) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // SELECT query
        CriteriaQuery<ResearchActivity> cq = cb.createQuery(ResearchActivity.class);
        Root<ResearchActivity> root = cq.from(ResearchActivity.class);

        if (filter != null && !filter.isBlank()) {
            cq.where(cb.like(root.get("name"), "%" + filter + "%"));
        }

        // Sorting
        if (ascending) {
            cq.orderBy(cb.asc(root.get(sanitizeSortBy(sortBy))));
        } else {
            cq.orderBy(cb.desc(root.get(sanitizeSortBy(sortBy))));
        }

        TypedQuery<ResearchActivity> query = entityManager.createQuery(cq);
        query.setFirstResult((page - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<ResearchActivity> resultList = query.getResultList();

        // COUNT query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<ResearchActivity> countRoot = countQuery.from(ResearchActivity.class);
        countQuery.select(cb.count(countRoot));

        if (filter != null && !filter.isBlank()) {
            countQuery.where(cb.like(countRoot.get("name"), "%" + filter + "%"));
        }

        Long totalCount = entityManager.createQuery(countQuery).getSingleResult();

        return new ResearchActivity();
    }

    public Optional<ResearchActivity> getResearcherById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public ResearchActivity addResearcher(ResearchActivity researcher) {
        researcher.setTime(LocalDateTime.now());
        return repository.save(researcher);
    }

    @Transactional
    public boolean updateResearcher(Long id, ResearchActivity updated) {
        Optional<ResearchActivity> optional = repository.findById(id);
        if (optional.isEmpty()) return false;

        ResearchActivity existing = optional.get();

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
        List<ResearchActivity> list = repository.findAll();
        StringBuilder sb = new StringBuilder("Id,CreatedAt,Name,Age\n");

//        for (ResearchActivity r : list) {
//            sb.append(r.getId()).append(",")
//                    .append(r.getCreatedAt()).append(",")
//                    .append(escapeCsv(r.getName())).append(",")
//                    .append(r.getAge()).append("\n");
//        }

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
