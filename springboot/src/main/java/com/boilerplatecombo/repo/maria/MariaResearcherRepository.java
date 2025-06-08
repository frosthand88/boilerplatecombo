package com.boilerplatecombo.repo.maria;

import com.boilerplatecombo.entity.mysql.MySqlResearcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MariaResearcherRepository extends JpaRepository<MySqlResearcher, Long> {}
