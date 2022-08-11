package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.Evaluation;
import com.dua.virtusbk.entity.Syllabu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.validation.ObjectError;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    @Query(value = "SELECT * FROM evaluations where topics_id_topic =?1", nativeQuery = true)
    List<Evaluation> findIdTopicEvaluationList(Long param);

    @Query(value = "SELECT * FROM evaluations where id_evaluation =?1", nativeQuery = true)
    Object[] findIdEvaluation(Long param);

    @Query(value = "SELECT information FROM questions_select(?1,?2)", nativeQuery = true)
    String returnEvaluation(int id_evaluation, int id_person);
}
