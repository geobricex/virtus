package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Person;
import com.dua.virtusbk.entity.Syllabu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface SyllabuRepository extends JpaRepository<Syllabu, Long> {
    @Query(value = "SELECT id_syllabu,  count(t.id_topic) as cant_topic,\n" +
            "       courses_id_course, datereg_syllabu, dateupdate_syllabu,\n" +
            "       name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu\n" +
            "FROM syllabus\n" +
            "LEFT JOIN topics t on syllabus.id_syllabu = t.syllabus_id_syllabu\n" +
            "WHERE state_syllabu = 'A' AND courses_id_course =?1 \n" +
            "GROUP BY syllabus.id_syllabu\n" +
            "ORDER BY syllabus.id_syllabu", nativeQuery = true)
    List<Map<String, Object>> findByIdCourseList(Long param);

    @Query(value = "SELECT * FROM syllabus where id_syllabu =?1", nativeQuery = true)
    Object[] findIdSyllabu(Long param);
}
