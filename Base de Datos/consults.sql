select * from persons order by id_person;
select * from questions;
-- delete from courses where name_course = 'bronco';
-- delete from persons_courses

select * from topics;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;
select infor from home_select(2,1);

select * from question_category;

select * from answers
inner join questions q on answers.questions_id_question = q.id_question
inner join question_category qc on q.question_category_id_questioncategory = qc.id_questioncategory;

select * from persons_courses;
delete from persons_courses where persons_id_person = 7;

select * from courses;

select * from answers;


-- FUNCTION: public.home_select(integer, integer)

-- DROP FUNCTION public.home_select(integer, integer);
                                        select
                                             (sum(timespent_person_evaluation)/count(timespent_person_evaluation)) as datereg_person_evaluation,
                                                  (sum(qualification_person_evaluation)/count(qualification_person_evaluation)) as qualification_person_evaluation,
                                                  p.evaluations_id_evaluation, e.name_evaluation, c.name_course
                                       from persons_evaluations as p
                                                inner join evaluations e on p.evaluations_id_evaluation = e.id_evaluation
                                                inner join topics t on e.topics_id_topic = t.id_topic
                                                inner join syllabus s on t.syllabus_id_syllabu = s.id_syllabu
                                                inner join courses c on s.courses_id_course = c.id_course
                                       where p.persons_id_person = 2
                                       group by evaluations_id_evaluation, name_evaluation, name_course;

select * from persons_evaluations;
