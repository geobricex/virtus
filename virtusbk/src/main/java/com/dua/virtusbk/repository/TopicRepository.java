package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Syllabu;
import com.dua.virtusbk.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    @Query(value = "SELECT * " +
            "FROM topics " +
            "WHERE state_topic = 'A' and syllabus_id_syllabu=?1 " +
            "ORDER BY id_topic asc", nativeQuery = true)
    List<Topic> findByIdTopicList(Long param);

    @Query(value = "SELECT * FROM topics where id_topic =?1", nativeQuery = true)
    List<Map<String, Object>>  findIdTopic(Long param);
}
