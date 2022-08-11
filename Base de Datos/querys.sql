select * from persons; --where id_syllabu =1;

select * from courses
where courses.id_course NOT IN (select persons_courses.courses_id_course from persons_courses
                            where persons_courses.persons_id_person = 2)

-- delete from topics where topics.id_topic =3
select (select COALESCE(array_to_json(array_agg(row_to_json(courses_.*))),'[]') as courses_
			 from (
				   SELECT name_course, description_course, pathimg_course, language_course, price_course, datereg_course,
				       (select COALESCE(array_to_json(array_agg(row_to_json(syllabus_.*))),'[]') as syllabus_
			               from (  select name_syllabu, description_syllabu, pathimg_syllabus, datereg_syllabu,
			                              (select COALESCE(array_to_json(array_agg(row_to_json(topics_.*))),'[]') as topics_
                                              from (  select name_topic, description_topic, pathimg_topic, levels_topic, datereg_topic
                                                       from topics
                                                       where topics.syllabus_id_syllabu = syllabus.id_syllabu and state_topic = 'A'
                                                       order by datereg_topic
                                                       ) as topics_)::json
			                       from syllabus
			                       where syllabus.courses_id_course = courses.id_course and state_syllabu = 'A'
			                       order by datereg_syllabu
			                       ) as syllabus_)::json
				FROM courses
			    WHERE id_course = 1

		) as courses_)::text;