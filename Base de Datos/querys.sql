select *
from persons;

select *
from persons_courses;

select *
from courses;

select *
from topics;

select *
from resources;


select *
from syllabus
where courses_id_course = 30;


select *
from questions--_category;
         inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory;
SELECT * FROM answers;
select *
from evaluations
where topics_id_topic = 29;
select * from evaluation_question_category;
select *
from resources
where topics_id_topic = 29;
select *
from answers
        where answers.options_answer ilike  '%11%'
   inner join questions q on answers.questions_id_question = q.id_question
    where q.title_question ilike  '%11%'
select *
from courses

select *
from utils;

select *
from settings;

select *
from evaluation_question_category
where evaluations_id_evaluation = 17
ORDER BY question_category_id_questioncategory;

UPDATE evaluation_question_category SET number_question = 0
WHERE evaluations_id_evaluation = 18 AND question_category_id_questioncategory = 7
                                      RETURNING id_evaluation_question_category;

select * from question_category;

select * from persons;

select * from persons_evaluations;



