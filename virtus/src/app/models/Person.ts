export class Person {
  private _id_person: number;
  private _name_person: string;
  private _lastname_person: string;
  private _email_person: string;
  private _password_person: string;
  private _type_person: string;
  private _pathimg_person: string;
  private _codeverification_person: string;
  private _datereg_person: object;
  private _dateupdate_person: object;
  private _provider_person: string;
  private _id_location: string;

  constructor() {
  }
  
  get id_person(): number {
    return this._id_person;
  }

  set id_person(value: number) {
    this._id_person = value;
  }

  get name_person(): string {
    return this._name_person;
  }

  set name_person(value: string) {
    this._name_person = value;
  }

  get lastname_person(): string {
    return this._lastname_person;
  }

  set lastname_person(value: string) {
    this._lastname_person = value;
  }

  get email_person(): string {
    return this._email_person;
  }

  set email_person(value: string) {
    this._email_person = value;
  }

  get password_person(): string {
    return this._password_person;
  }

  set password_person(value: string) {
    this._password_person = value;
  }

  get type_person(): string {
    return this._type_person;
  }

  set type_person(value: string) {
    this._type_person = value;
  }

  get pathimg_person(): string {
    return this._pathimg_person;
  }

  set pathimg_person(value: string) {
    this._pathimg_person = value;
  }

  get codeverification_person(): string {
    return this._codeverification_person;
  }

  set codeverification_person(value: string) {
    this._codeverification_person = value;
  }

  get datereg_person(): object {
    return this._datereg_person;
  }

  set datereg_person(value: object) {
    this._datereg_person = value;
  }

  get dateupdate_person(): object {
    return this._dateupdate_person;
  }

  set dateupdate_person(value: object) {
    this._dateupdate_person = value;
  }

  get provider_person(): string {
    return this._provider_person;
  }

  set provider_person(value: string) {
    this._provider_person = value;
  }

  get id_location(): string {
    return this._id_location;
  }

  set id_location(value: string) {
    this._id_location = value;
  }
}


