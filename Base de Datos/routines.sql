create function questions_select(id_parameter_evaluation integer, id_parameter_person integer)
    returns TABLE(information text)
    language plpgsql
as
$$
DECLARE
    trueorFalse record:= null;
    simpleOption record:= null;
    multipleOption json:= '[]';
    complete json:= '[]';
    relate json:= '[]';
    puzzle json:= '[]';
  BEGIN
  	BEGIN
    --topic -
    -- SELECT information FROM questions_select(1,1)
    -- select * from evaluations;

             trueorFalse:=  (select json_ from ( select RANDOM() as order_question, name_questioncategory ,title_question, description_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as trueorFalse
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = 1--evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 1 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
			                       limit ( select eqc2.number_question
                                           from evaluation_question_category as eqc2
                                           where eqc2.evaluations_id_evaluation = 1--evaluations.id_evaluation
                                           and eqc2.question_category_id_questioncategory = 1)

			               ) as json_)::json;

                 simpleOption:=  (select json_ from ( select RANDOM() as order_question, name_questioncategory ,title_question, description_question,
			                              pathurlsign_question,  pathurlvideo_question,  pathurlfile_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as simpleOption
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = 1--evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 1 and qc.state_questioncategory = 'A'
			                       order by question_category_id_questioncategory, order_question
			                       limit ( select eqc2.number_question
                                           from evaluation_question_category as eqc2
                                           where eqc2.evaluations_id_evaluation = 1--evaluations.id_evaluation
                                           and eqc2.question_category_id_questioncategory = 1)

			               ) as json_)::json;

			return query select (select COALESCE(array_to_json(array_agg(row_to_json(evaluation_.*))),'[]') as evaluation
			 from (
				SELECT name_evaluation, description_evaluation, time_evaluation, timeminutes_evaluation, numberquestion_evaluation,
                        trueorFalse, simpleOption
				FROM evaluations
			    WHERE id_evaluation = id_parameter_evaluation AND state_evaluation = 'A'

		) as evaluation_)::text;


	EXCEPTION WHEN OTHERS THEN
		raise notice '% %', SQLERRM, SQLSTATE;
		rollback;
	END;
END;
$$;

alter function questions_select2(integer, integer) owner to postgres;

