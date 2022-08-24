import {Component, OnInit} from '@angular/core';
import {Person} from "../../models/Person";

import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";
import {Message} from "primeng/api";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  person: Person;
  newpassword: string;
  globalUri: string = "";
  date: Date;
  msgs: Message[] = [];

  frmSingUp: FormGroup;

  constructor(
    private utils: Utils,
    private _http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.person = new Person(0, "", "", "", "", "", "", "", "", "", "");
    this.date = new Date();
    this.frmSingUp = this.formBuilder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      repeat_password: ["", Validators.required]
    });
  }

  get form() {
    return this.frmSingUp.controls;
  }

  registerUser() {

    if (this.newpassword !== this.person._passwordPerson) {
      this.utils.showMessages(1, "Las contraseñas no son iguales, intente de nuevo.", "tst");
      return;
    }

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Virtus', detail: 'Procesando...'});
    this.person._codeverificationPerson = "000";
    this.person._dateregPerson = "";//this.date.toISOString().split('T')[0] + " " + this.date.getHours() + ":" + this.date.getMinutes();
    this.person._dateupdatePerson = "";// this.date.toISOString().split('T')[0] + " " + this.date.getHours() + ":" + this.date.getMinutes();
    this.person._idLocation = "0-0-0";
    this.person._providerPerson = "native";
    this.person._typePerson = "S";
    console.log(this.person);
    this.apirRegisterUser(this.person).subscribe(response => {
      this.msgs = [];
      console.log(response);
      this.utils.showMessages(response.status, response.information, "tst");
      this.person = new Person(0, "", "", "", "", "", "", "", "", "", "");
      this.newpassword = "";
    });
  }

  apirRegisterUser(person: Person): Observable<any> {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtus_bk/persons/signup";
    } else {
      // this.globalUri = "virtusbk/persons/signup";
      this.globalUri = "virtusbk/persons/signup";
    }
    return this._http.post<Person>(this.globalUri, person);
  }

}
