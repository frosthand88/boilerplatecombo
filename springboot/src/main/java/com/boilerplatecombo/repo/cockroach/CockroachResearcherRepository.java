package com.boilerplatecombo.repo.cockroach;

import com.boilerplatecombo.entity.cockroach.CockroachResearcher;
import com.boilerplatecombo.entity.postgres.PostgresResearcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CockroachResearcherRepository extends JpaRepository<CockroachResearcher, Long> {}
