import {Component, OnInit} from '@angular/core';
import {Person} from "../../models/Person";

import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  person: Person;
  newpassword: string;
  globalUri: string = "";

  constructor(
    private utils: Utils,
    private _http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.person = new Person();
  }

  registerUser() {

  }

  apirRegisterUser(): Observable<any> {
    this.globalUri = "virtusbk/persons";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native');

    return this._http.post(this.globalUri, {
      "codeverificationPerson": "",
      "dateregPerson": "yyyy-MM-dd HH:mm",
      "dateupdatePerson": "yyyy-MM-dd HH:mm",
      "emailPerson": "string",
      "id": 0,
      "idLocation": "string",
      "lastnamePerson": "string",
      "namePerson": "string",
      "passwordPerson": "string",
      "pathimgPerson": "string",
      "providerPerson": "string",
      "typePerson": "string"
    }, {'headers': headers});
  }

}
