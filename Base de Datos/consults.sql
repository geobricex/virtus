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

select * from answers;


-- FUNCTION: public.home_select(integer, integer)

-- DROP FUNCTION public.home_select(integer, integer);

CREATE OR REPLACE FUNCTION public.home_select(
	id_type integer,
	id_parameter integer)
    RETURNS TABLE(status integer, infor text)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
  status int:= 4;
  BEGIN
  	BEGIN
	-- COUNTS
		IF (id_type = 1) THEN

			status:= 2;

			return query select
			status, (select COALESCE(array_to_json(array_agg(row_to_json(home.*))),'[]') as home from (
			select

			(select count(*) as my_courses from persons_courses
			 where persons_id_person = id_parameter),

			(select COALESCE(sum(persons_evaluations.qualification_person_evaluation),'0') as my_point from persons_evaluations
			where persons_id_person = id_parameter),

			(select count(*) as total_course from courses
			where state_course not in ('I')),

			(select count(*) as total_user from persons
			where type_person not in ('I', 'S'))
			) as home)::text;


		END IF;


	EXCEPTION WHEN OTHERS THEN
		raise notice '% %', SQLERRM, SQLSTATE;
		status:=4;
		rollback;
	END;
END;
$BODY$;

ALTER FUNCTION public.home_select(integer, integer)
    OWNER TO postgres;

