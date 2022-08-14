select * from persons order by id_person;

-- delete from courses where name_course = 'bronco';
-- delete from persons_courses

select * from topics;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;

select infor from home_select(1,1)


	SELECT courses.id_course, count(s.id_syllabu) as cant_syllabu,
	       name_course, description_course, keywords_course, pathimg_course, datereg_course,
	       dateupdate_course, state_course, language_course, price_course
	FROM courses
	 LEFT JOIN syllabus s on courses.id_course = s.courses_id_course
	WHERE courses.id_course NOT IN (select persons_courses.courses_id_course from persons_courses
									where persons_courses.persons_id_person = 4)
    GROUP BY courses.id_course
    ORDER BY courses.id_course;

SELECT id_syllabu,  count(t.id_topic) as cant_topic,
       courses_id_course, datereg_syllabu, dateupdate_syllabu,
       name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
FROM syllabus
LEFT JOIN topics t on syllabus.id_syllabu = t.syllabus_id_syllabu
WHERE state_syllabu = 'A' AND courses_id_course =10
GROUP BY syllabus.id_syllabu
ORDER BY syllabus.id_syllabu


