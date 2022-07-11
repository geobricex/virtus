package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}