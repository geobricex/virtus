select * from persons; --where id_syllabu =1;

select * from courses
where courses.id_course NOT IN (select persons_courses.courses_id_course from persons_courses
                            where persons_courses.persons_id_person = 2)

-- delete from topics where topics.id_topic =3