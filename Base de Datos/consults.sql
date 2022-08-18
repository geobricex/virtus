select * from persons order by id_person;

-- delete from courses where name_course = 'bronco';
-- delete from persons_courses

select * from topics;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;
select infor from home_select(2,1)

select * from answers
inner join questions q on answers.questions_id_question = q.id_question
inner join question_category qc on q.question_category_id_questioncategory = qc.id_questioncategory;

Update questions set feedback_question = '¡Estudiar un poco más!' where feedback_question is null



