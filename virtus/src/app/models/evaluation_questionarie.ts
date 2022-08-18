export interface EvaluationQuestionsResponse {
  data:        Evaluation[];
  information: string;
  status:      number;
}

export interface Evaluation {
  description_evaluation:    string;
  name_evaluation:           string;
  numberquestion_evaluation: number;
  questions_:                Questions[];
  time_evaluation:           boolean;
  timeminutes_evaluation:    number;
}

export interface Questions {
  answers_:               Answers[];
  description_question:   string;
  feedback_question:      string;
  level_question:         number;
  maximumpoints_question: number;
  name_questioncategory:  string;
  order_question:         number;
  pathurlfile_question: string;
  pathurlsign_question: string;
  pathurlvideo_question: string;
  points_question:        boolean;
  title_question:         string;
  canResource?:           boolean;
}

export interface Answers {
  options_answer: OptionsAnswer[];
  responses?: OptionsAnswer[];
}

export interface OptionsAnswer {
  //selección simple y múltiple
  correct:  Correct;
  opcion:   string;
  resource?: string;
  // yo he seleccionado?
  //miSelected?: boolean;
  //pregunta de complete
  description_question: string; // pregunta con psudocadena
  description_question_R: string; // respuesta para comparar
  options: Options[] //literales
  //Unir con línea
  leftSide: string;
  resourse_leftSide: string;
  resourse_rightSide: string;
  rightSide: string;
}

export enum Correct {
  No = "No",
  Yes = "Yes",
}

export interface Options {
  option: string;
  resource: string;
}
