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
    this.apirRegisterUser().subscribe(response => {
      console.log(response);
    });
  }

  apirRegisterUser(): Observable<any> {
    this.globalUri = "virtusbk/persons";
    var jsonPerson = JSON.stringify(this.person);
    return this._http.post(this.globalUri, {
      jsonPerson
    });
  }

}
