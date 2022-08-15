 select (select COALESCE(array_to_json(array_agg(row_to_json(evaluation_.*))),'[]') as evaluation
			 from (
				SELECT distinct on(id_evaluation) name_evaluation, description_evaluation, time_evaluation, timeminutes_evaluation, numberquestion_evaluation,

				      (select COALESCE(array_to_json(array_agg(row_to_json(trueorFalse.*))),'[]') as trueorFalse
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(answers_.*))),'[]') as trueorFalse
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as answers_)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 1
			                       order by question_category_id_questioncategory, order_question
			                    ) as trueorFalse
			               )::json,

				      (select COALESCE(array_to_json(array_agg(row_to_json(simpleOption.*))),'[]') as simpleOption
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(simpleOption.*))),'[]') as simpleOption
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as simpleOption)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 2
			                       order by question_category_id_questioncategory, order_question
			                    ) as simpleOption
			               )::json,
				      (select COALESCE(array_to_json(array_agg(row_to_json(multipleOption.*))),'[]') as multipleOption
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(multipleOption.*))),'[]') as multipleOption
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as multipleOption)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 3
			                       order by question_category_id_questioncategory, order_question
			                    ) as multipleOption
			               )::json,
				      (select COALESCE(array_to_json(array_agg(row_to_json(complete.*))),'[]') as complete
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(complete.*))),'[]') as complete
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as complete)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 4
			                       order by question_category_id_questioncategory, order_question
			                    ) as complete
			           )::json,
				      (select COALESCE(array_to_json(array_agg(row_to_json(relate.*))),'[]') as relate
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(relate.*))),'[]') as complete
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as relate)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 5
			                       order by question_category_id_questioncategory, order_question
			                    ) as relate
			           )::json,
				      (select COALESCE(array_to_json(array_agg(row_to_json(puzzle.*))),'[]') as puzzle
			               from (  select RANDOM() as order_question, name_questioncategory ,title_question, description_question, pathurlsign_question, points_question, maximumpoints_question, level_question
			                              , (select COALESCE(array_to_json(array_agg(row_to_json(puzzle.*))),'[]') as complete
                                              from (  select options_answer::json
                                                       from answers
                                                       where answers.questions_id_question = questions.id_question
                                                   ) as puzzle)::json
			                       from questions
			                       inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory
			                       where questions.evaluations_id_evaluation = evaluations.id_evaluation
			                             and state_question = 'A' and qc.id_questioncategory = 6
			                       order by question_category_id_questioncategory, order_question
			                    ) as puzzle
			           )::json

				FROM evaluations
				INNER JOIN evaluation_question_category eqc ON evaluations.id_evaluation = eqc.evaluations_id_evaluation
			    WHERE id_evaluation = 1
			          AND state_evaluation = 'A'

		) as evaluation_)::text;


