package com.dua.virtusbk.repository;

import com.dua.virtusbk.entity.EvaluationQuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EvaluationQuestionCategoryRepository extends JpaRepository<EvaluationQuestionCategory, Long> {


    @Query(value = "UPDATE evaluation_question_category SET number_question = ?1 WHERE evaluations_id_evaluation = ?2 AND question_category_id_questioncategory = ?3 RETURNING id_evaluation_question_category ", nativeQuery = true)
    Long updatePersonsQuestions(Long quantity_question, Long id_evaluation, Long id_question_category);

}
