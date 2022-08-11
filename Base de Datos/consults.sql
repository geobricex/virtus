select * from persons order by id_person;

-- delete from courses where name_course = 'bronco';
-- delete from persons_courses
select * from courses;
select * from persons_courses;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;

select infor from home_select(1,1)


