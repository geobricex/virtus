package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
}