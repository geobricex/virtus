export class Modules {
  private id: number;
  private nameSyllabu: string;
  private descriptionSyllabu: string;
  private keywordsSyllabu: string;
  private pathimgSyllabus: string;
  private dateregSyllabu: string;
  private dateupdateSyllabu: string;
  private stateSyllabu: string;


  constructor() {
  }


  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _nameSyllabu(): string {
    return this.nameSyllabu;
  }

  set _nameSyllabu(value: string) {
    this.nameSyllabu = value;
  }

  get _descriptionSyllabu(): string {
    return this.descriptionSyllabu;
  }

  set _descriptionSyllabu(value: string) {
    this.descriptionSyllabu = value;
  }

  get _keywordsSyllabu(): string {
    return this.keywordsSyllabu;
  }

  set _keywordsSyllabu(value: string) {
    this.keywordsSyllabu = value;
  }

  get _pathimgSyllabus(): string {
    return this.pathimgSyllabus;
  }

  set _pathimgSyllabus(value: string) {
    this.pathimgSyllabus = value;
  }

  get _dateregSyllabu(): string {
    return this.dateregSyllabu;
  }

  set _dateregSyllabu(value: string) {
    this.dateregSyllabu = value;
  }

  get _dateupdateSyllabu(): string {
    return this.dateupdateSyllabu;
  }

  set _dateupdateSyllabu(value: string) {
    this.dateupdateSyllabu = value;
  }

  get _stateSyllabu(): string {
    return this.stateSyllabu;
  }

  set _stateSyllabu(value: string) {
    this.stateSyllabu = value;
  }
}
