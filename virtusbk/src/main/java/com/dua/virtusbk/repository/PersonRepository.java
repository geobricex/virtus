package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query(value = "select per.* from persons as per where per.email_person=?1", nativeQuery = true)
    Person findByEmail(String param);

}
