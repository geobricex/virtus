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

select * from persons_courses;
delete from persons_courses where persons_id_person = 7;

select * from courses;



SELECT id_syllabu,  count(t.id_topic) as cant_topic,
           courses_id_course, datereg_syllabu::date, dateupdate_syllabu,
             name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
            FROM syllabus
            LEFT JOIN topics t on syllabus.id_syllabu = t.syllabus_id_syllabu
            WHERE state_syllabu = 'A' AND courses_id_course =1
            GROUP BY syllabus.id_syllabu
            ORDER BY syllabus.id_syllabu

