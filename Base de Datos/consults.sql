select * from persons order by id_person;
select * from questions;
-- delete from courses where name_course = 'bronco';
-- delete from persons_courses

select * from topics;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;
select infor from home_select(2,1);

select * from answers
inner join questions q on answers.questions_id_question = q.id_question
inner join question_category qc on q.question_category_id_questioncategory = qc.id_questioncategory;

SELECT id_evaluation,
       name_evaluation,
       description_evaluation,
       datereg_evaluation,
       dateupdate_evaluation,
       time_evaluation,
       timeminutes_evaluation,
       topics_id_topic,
       state_evaluation,
       type_evaluation,
       opportunities_evaluation,
       order_category,
       sum(eqc.number_question) as numberquestion_evaluation
FROM evaluations
         INNER JOIN evaluation_question_category eqc on evaluations.id_evaluation = eqc.evaluations_id_evaluation
WHERE topics_id_topic=1
group by id_evaluation




