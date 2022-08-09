package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.Syllabu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SyllabuRepository extends JpaRepository<Syllabu, Long> {
    @Query(value = "SELECT id_syllabu, courses_id_course, datereg_syllabu, dateupdate_syllabu," +
            "name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu " +
            "FROM syllabus " +
            "WHERE state_syllabu = 'A' AND courses_id_course =?1", nativeQuery = true)
    List<Syllabu> findByIdCourseList(Long param);
}
