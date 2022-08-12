select * from persons order by id_person;

-- delete from courses where name_course = 'bronco';
-- delete from persons_courses
select * from courses;
select * from persons_courses;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;

select infor from home_select(1,1)

SELECT c.id_course::bigint,
			c.name_course::character varying,
			c.description_course::character varying,
			c.keywords_course::character varying,
			c.pathimg_course::character varying,
			c.datereg_course::timestamp without time zone,
			c.dateupdate_course::timestamp without time zone,
			c.state_course::character varying,
			c.language_course::character varying,
			c.persons_id_person::bigint,
			c.price_course::numeric(2)
			FROM persons_courses as pc
			INNER JOIN courses c on pc.courses_id_course = c.id_course
			--INNER JOIN persons p on c.persons_id_person = p.id_person
			WHERE pc.persons_id_person = 2
			AND c.state_course = 'A' AND state_person_course = 'A'
            ORDER BY datereg_person_course;
