select * from persons;

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
