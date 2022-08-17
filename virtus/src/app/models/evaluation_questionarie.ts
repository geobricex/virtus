export interface EvaluationQuestionsResponse {
  data: Evaluation[];
  information: string;
  status: Status;
}

export enum Status{
  info = 1,
  success = 2,
  warning = 3,
  error = 4
}

export interface Evaluation {
  description_evaluation: string;
  name_evaluation: string;
  opportunities_evaluation: number;
  opportunity_evaluation: boolean;
  time_evaluation: boolean;
  timeminutes_evaluation: number;
  type_evaluation: TypeEvaluation;
  multipleoption: QuestionModel[]; //PleOption
  complete: QuestionModel[]; //Complete
  relate: QuestionModel[]; //Relate
  simpleoption: QuestionModel[]; //PleOption
  puzzle: any[];
  trueorfalse: any[];
}

export enum TypeEvaluation{
  evaluacion = 1,
  cuentionario = 2,
}

export interface QuestionModel {
  answers_: OptionAnswers[];
  description_question: string;
  level_question: number;
  maximumpoints_question: number;
  name_questioncategory: string;
  order_question: number;
  pathurlsign_question: string;
  points_question: boolean;
  title_question: string;
  canResource?: boolean;
}
/*
// Simple y Multiple question options
export interface PleOption {
  answers_: PleOptionAnswers[];
  description_question: string;
  level_question: number;
  maximumpoints_question: number;
  name_questioncategory: string;
  order_question: number;
  pathurlsign_question: string;
  points_question: boolean;
  title_question: string;
}

export interface Complete {
  answers_: CompleteAnswers[];
  description_question: string;
  level_question: number;
  maximumpoints_question: number;
  name_questioncategory: string;
  order_question: number;
  pathurlsign_question: string;
  points_question: boolean;
  title_question: string;
}

// preguntas de relación

export interface Relate {
  answers_: RelateAnswers[];
  description_question: string;
  level_question: number;
  maximumpoints_question: number;
  name_questioncategory: string;
  order_question: number;
  pathurlsign_question: string;
  points_question: boolean;
  title_question: string;
}*/
//grupo de opciones - global
export interface OptionAnswers {
  //options_answer: Option[] | CompleteOptionsAnswer[] | RelateAnswersOptions[];
  options_answer: Option[]
  responses?: Option[] | string;
  points?: number
}
export interface Option {
  opcion: string;
  resource: string;
  correct: Correct;
  //completar
  description_question: string;
  description_question_R?: string;
  options?: OptionComplete[];
  //unir con linea
  leftSide?: string;
  resourse_leftSide?: string;
  resourse_rightSide?: string;
  rightSide?: string;
}
/*
export interface PleOptionAnswers {
  options_answer: Option[];
  responses?: Option[] | string;
  points?: number
}

export interface CompleteAnswers {
  options_answer: CompleteOptionsAnswer[];
  responses?: Option[] | string;
  points?: number
}

export interface RelateAnswers {
  options_answer: RelateAnswersOptions[];
  responses?: Option[] | string;
  points?: number
}*/
//opciones
/*export interface Option {
  option: string;
  resource: string;
  correct?: Correct;
}*/
/*
export interface RelateAnswersOptions {
  leftSide: string;
  resourse_leftSide: string;
  resourse_rightSide: string;
  rightSide: string;
}

export interface CompleteOptionsAnswer {
  description_question: string;
  description_question_R: string;
  options: Option[];
}
*/
export interface OptionComplete {
  option: string;
  resource: string;
}

export enum Correct {
  No = "No",
  Yes = "Yes",
}
