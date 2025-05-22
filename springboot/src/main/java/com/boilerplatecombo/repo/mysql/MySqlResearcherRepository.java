package com.boilerplatecombo.repo.mysql;

import com.boilerplatecombo.entity.mysql.MySqlResearcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MySqlResearcherRepository extends JpaRepository<MySqlResearcher, Long> {}
