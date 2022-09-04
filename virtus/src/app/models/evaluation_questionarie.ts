export interface EvaluationQuestionsResponse {
  data: Evaluation[];
  information: string;
  status: number;
}

export interface Evaluation {
  description_evaluation: string;
  name_evaluation: string;
  numberquestion_evaluation: number;
  questions_: Questions[];
  time_evaluation: boolean;
  timeminutes_evaluation: number;
  order_category: boolean;
  response_all_time: number;
}

export interface Questions {
  answers_: Answers[];
  description_question: string;
  feedback_question: string;
  hint_question: string;
  id_question: number;
  level_question: number;
  maximumpoints_question: number;
  name_questioncategory: string;
  order_question: number;
  pathurlfile_question: string;
  pathurlsign_question: string;
  pathurlvideo_question: string;
  points_question: boolean;
  title_question: string;
  canResource: boolean;//de front
  response_points?: number;
  response_time?: number;
}

export interface QuestionsModel {
  descriptionQuestion: string;
  feedbackQuestion: string;
  hintQuestion: string;
  id: number;
  maximumpointsQuestion: number;
  pathurlfileQuestion: string;
  pathurlsignQuestion: string;
  pathurlvideoQuestion: string;
  pointsQuestion: boolean;
  stateQuestion: string;
  titleQuestion: string;
  evaluationsIdEvaluation: EvaluationModel;
  questionCategoryIdQuestionCategory: QuestionCategory
}

export interface EvaluationModel {
  id: number
}

export interface QuestionCategory {
  id: number;
  nameQuestionCategory: string;
  stateQuestioncategory: string;
}

export interface Answers {
  options_answer: OptionsAnswer[];
  responses: OptionsAnswer[];//interface
  complete_parts?: string[];//interface
  right_parts?: OptionsAnswer[];//interface
}

export interface AnswersModel {
  dateregAnswer: string;
  dateupdateAnswer: string;
  id: number;
  optionsAnswer: string;
  questionsIdQuestion: QuestionsModel;
}

export interface OptionsAnswer {
  //selección simple y múltiple
  correct: Correct;
  opcion: string;
  resource?: string;
  // yo he seleccionado?
  //pregunta de complete
  description_question: string; // pregunta con psudocadena
  description_question_R: string; // respuesta para comparar
  options: Options[] //literales
  response: Options[]
  //Unir con línea
  leftSide: string;
  resourse_leftSide: string;
  resourse_rightSide: string;
  rightSide: string;
  ind?: number;//interface
  //puzzle
  piece_questionarie: number;
}

export enum Correct {
  No = "No",
  Yes = "Yes",
}

export interface Options {
  option: string;
  resource: string;
}
