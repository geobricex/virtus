export class Topic {
  private id: string;
  private nameTopic: string;
  private descriptionTopic: string;
  private keywordsTopic: string;
  private pathimgTopic: string;
  private dateregTopic: string;
  private dateupdateTopic: string;
  private stateTopic: string;
  private levelsTopic: string;

  constructor() {
  }


  get _id(): string {
    return this.id;
  }

  set_id(value: string) {
    this.id = value;
  }

  get _nameTopic(): string {
    return this.nameTopic;
  }

  set_nameTopic(value: string) {
    this.nameTopic = value;
  }

  get _descriptionTopic(): string {
    return this.descriptionTopic;
  }

  set_descriptionTopic(value: string) {
    this.descriptionTopic = value;
  }

  get _keywordsTopic(): string {
    return this.keywordsTopic;
  }

  set_keywordsTopic(value: string) {
    this.keywordsTopic = value;
  }

  get _pathimgTopic(): string {
    return this.pathimgTopic;
  }

  set_pathimgTopic(value: string) {
    this.pathimgTopic = value;
  }

  get _dateregTopic(): string {
    return this.dateregTopic;
  }

  set_dateregTopic(value: string) {
    this.dateregTopic = value;
  }

  get _dateupdateTopic(): string {
    return this.dateupdateTopic;
  }

  set_dateupdateTopic(value: string) {
    this.dateupdateTopic = value;
  }

  get _stateTopic(): string {
    return this.stateTopic;
  }

  set_stateTopic(value: string) {
    this.stateTopic = value;
  }

  get _levelsTopic(): string {
    return this.levelsTopic;
  }

  set_levelsTopic(value: string) {
    this.levelsTopic = value;
  }
}
