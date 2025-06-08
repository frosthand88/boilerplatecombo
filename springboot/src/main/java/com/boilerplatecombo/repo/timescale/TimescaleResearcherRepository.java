package com.boilerplatecombo.repo.timescale;

import com.boilerplatecombo.entity.timescale.ResearchActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimescaleResearcherRepository extends JpaRepository<ResearchActivity, Long> {}