select * from persons order by id_person;

-- delete from persons where name_person = 'Juan';
-- delete from persons_courses
select * from utils;
select * from persons_courses;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;

SELECT pc.id_person_course, pc.datereg_person_course,
       c.id_course, c.description_course, c.name_course, c.pathimg_course,
       c.dateupdate_course, c.language_course, c.keywords_course, c.price_course
FROM persons_courses as pc
INNER JOIN courses c on pc.courses_id_course = c.id_course
INNER JOIN persons p on c.persons_id_person = p.id_person
WHERE pc.courses_id_course = 1 AND pc.persons_id_person = 1
AND state_course = 'A' AND state_person_course = 'A'

SELECT pc.id_person_course, pc.datereg_person_course,
    c.id_course, c.description_course, c.name_course, c.pathimg_course,
    c.dateupdate_course, c.language_course, c.keywords_course, c.price_course
    FROM persons_courses as pc
    INNER JOIN courses c on pc.courses_id_course = c.id_course
    INNER JOIN persons p on c.persons_id_person = p.id_person
    WHERE pc.persons_id_person = 1
    AND state_course = 'A' AND state_person_course = 'A'

select count(*) as my_courses from persons_courses where persons_id_person = 1
select COALESCE(sum(qualification_person_answer),'0') as my_point from persons_answers
where persons_id_person = 1
select count(*) as total_course from courses
where state_course not in ('I')
select count(*) as total_user from persons
where type_person not in ('I', 'S')

select infor from home_select(1,1)
