create function questions_all_select(id_parameter_evaluation integer, id_parameter_person integer)
    returns TABLE(information text)
    language plpgsql
as
$$
DECLARE
    --trueorFalse record:= null;
    --simpleOption record:= null;
  BEGIN
  	BEGIN
    --topic -

    -- SELECT information FROM questions_select(11,1);

    -- select * from evaluations;

			return query select (select COALESCE(array_to_json(array_agg(row_to_json(evaluation_.*))),'[]') as evaluation
			 from (
				SELECT name_evaluation, description_evaluation,
				       time_evaluation, timeminutes_evaluation,
				       order_category, --numberquestion_evaluation,
				       (select  COALESCE(array_to_json(array_agg(row_to_json(questions_.*))),'[]') as questions_
			               from ( select * from
			                    (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 1 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 1)

			                       ) as questions_1

			                        UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 2 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 2)

			                       ) as questions_2

			                        UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 3 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 3)

			                       ) as questions_3

			                         UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 7 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 7)

			                       ) as questions_7

			                       UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 4 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 4)

			                       ) as questions_4

			                       UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 5 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 5)

			                       ) as questions_5

			                         UNION ALL

			                      select * from (select (RANDOM())::character varying as order_question, id_question, name_questioncategory ,title_question, description_question, feedback_question, hint_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as answers_
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 6 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
-- 			                       limit ( select eqc2.number_question
--                                            from evaluation_question_category as eqc2
--                                            where eqc2.evaluations_id_evaluation = evaluations.id_evaluation
--                                            and eqc2.question_category_id_questioncategory = 6)

			                       ) as questions_6


			                    ) as questions_
			               )::json

                FROM evaluations
			    WHERE id_evaluation = id_parameter_evaluation AND state_evaluation = 'A'


	     	) as evaluation_)::text;


	EXCEPTION WHEN OTHERS THEN
		raise notice '% %', SQLERRM, SQLSTATE;
		rollback;
	END;
END;
$$;


