package com.boilerplatecombo.repo.mssql;

import com.boilerplatecombo.entity.mssql.MsSqlResearcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MsSqlResearcherRepository extends JpaRepository<MsSqlResearcher, Long> {}
