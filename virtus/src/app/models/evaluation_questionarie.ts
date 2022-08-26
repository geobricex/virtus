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
  order_category:            boolean;
}

export interface Questions {
  answers_:               Answers[];
  description_question:   string;
  feedback_question:      string;
  hint_question:          string;
  id_question:            number;
  level_question:         number;
  maximumpoints_question: number;
  name_questioncategory:  string;
  order_question:         number;
  pathurlfile_question:   string;
  pathurlsign_question:   string;
  pathurlvideo_question:  string;
  points_question:        boolean;
  title_question:         string;
  canResource:            boolean;//de front
}

export interface Answers {
  options_answer: OptionsAnswer[];
  responses: OptionsAnswer[];
  complete_parts?: string[];
  right_parts?: OptionsAnswer[];
}

export interface OptionsAnswer {
  //selección simple y múltiple
  correct:  Correct;
  opcion:   string;
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
  ind?: number;
}

export enum Correct {
  No = "No",
  Yes = "Yes",
}

export interface Options {
  option: string;
  resource: string;
}
