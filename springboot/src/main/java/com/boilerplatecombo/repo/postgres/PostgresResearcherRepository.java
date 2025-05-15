package com.boilerplatecombo.repo.postgres;

import com.boilerplatecombo.entity.postgres.PostgresResearcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostgresResearcherRepository extends JpaRepository<PostgresResearcher, Long> {}
