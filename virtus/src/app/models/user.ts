
export class User {
    private _email: string;
    private _password: string;
    private _rol: string;

    constructor(email: string, password: string, rol: string) {
      this._email = email;
      this._password = password;
      this._rol = rol
    }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get rol(): string {
    return this._rol;
  }

  set rol(value: string) {
    this._rol = value;
  }
}

