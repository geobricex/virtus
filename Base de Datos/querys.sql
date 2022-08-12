select * from persons; --where id_syllabu =1;

select * from persons_courses
where courses.id_course NOT IN (select persons_courses.courses_id_course from persons_courses
                            where persons_courses.persons_id_person = 2)
select * from evaluations;
select * from questions _category
inner join answers a on questions.id_question = a.questions_id_question

select * from answers