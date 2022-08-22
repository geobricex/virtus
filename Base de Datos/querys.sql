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
from questions--_category;
         inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory;

select *
from answers;

select *
from answers
         inner join questions q on answers.questions_id_question = q.id_question;

select *
from utils;

select *
from settings;

select *
from evaluation_question_category;

select * from question_category;

