import {Topic} from "./topic";

export class Evaluation {
  private id: number;
  private nameEvaluation: string;
  private descriptionEvaluation: string;
  private dateregEvaluation: string;
  private dateupdateEvaluation: string;
  private timeEvaluation: string;
  private timeminutesEvaluation: string;
  private numberquestionEvaluation: string;
  private state_evaluation: string;
  private topicsIdTopic: Topic


  constructor(id: number, nameEvaluation: string, descriptionEvaluation: string, dateregEvaluation: string, dateupdateEvaluation: string, timeEvaluation: string, timeminutesEvaluation: string, numberquestionEvaluation: string, state_evaluation: string) {
    this.id = id;
    this.nameEvaluation = nameEvaluation;
    this.descriptionEvaluation = descriptionEvaluation;
    this.dateregEvaluation = dateregEvaluation;
    this.dateupdateEvaluation = dateupdateEvaluation;
    this.timeEvaluation = timeEvaluation;
    this.timeminutesEvaluation = timeminutesEvaluation;
    this.numberquestionEvaluation = numberquestionEvaluation;
    this.state_evaluation = state_evaluation;
  }

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _nameEvaluation(): string {
    return this.nameEvaluation;
  }

  set _nameEvaluation(value: string) {
    this.nameEvaluation = value;
  }

  get _descriptionEvaluation(): string {
    return this.descriptionEvaluation;
  }

  set _descriptionEvaluation(value: string) {
    this.descriptionEvaluation = value;
  }

  get _dateregEvaluation(): string {
    return this.dateregEvaluation;
  }

  set _dateregEvaluation(value: string) {
    this.dateregEvaluation = value;
  }

  get _dateupdateEvaluation(): string {
    return this.dateupdateEvaluation;
  }

  set _dateupdateEvaluation(value: string) {
    this.dateupdateEvaluation = value;
  }

  get _timeEvaluation(): string {
    return this.timeEvaluation;
  }

  set _timeEvaluation(value: string) {
    this.timeEvaluation = value;
  }

  get _timeminutesEvaluation(): string {
    return this.timeminutesEvaluation;
  }

  set _timeminutesEvaluation(value: string) {
    this.timeminutesEvaluation = value;
  }

  get _numberquestionEvaluation(): string {
    return this.numberquestionEvaluation;
  }

  set _numberquestionEvaluation(value: string) {
    this.numberquestionEvaluation = value;
  }

  get _state_evaluation(): string {
    return this.state_evaluation;
  }

  set _state_evaluation(value: string) {
    this.state_evaluation = value;
  }

  get _topicsIdTopic(): Topic {
    return this.topicsIdTopic;
  }

  set _topicsIdTopic(value: Topic) {
    this.topicsIdTopic = value;
  }
}
