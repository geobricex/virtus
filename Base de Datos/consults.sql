select * from persons;

--delete from persons where name_person = 'Juan';
select * from utils;

select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1

select *
from topics
where state_topic = 'A' and syllabus_id_syllabu =1