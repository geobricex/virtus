import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Utils} from "../../util/Utils";
import {HttpClient} from "@angular/common/http";
import {Person} from "../../models/Person";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  email: string | null = "";
  code: string | null = "";
  vericateAccount: boolean;
  globalUri: string = "";

  constructor(
    private _route: ActivatedRoute,
    private utils: Utils,
    private _http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.vericateAccount = false;
    this.email = this._route.snapshot.paramMap.get("email");
    this.code = this._route.snapshot.paramMap.get("code");
    console.log(this.email, this.code);
  }

  apiRequestCode() {
    this.globalUri = "virtusbk/persons/signup";
    return this._http.post<Person>(this.globalUri, {
      "flag": "1",
      "email": this.email,
      "code": this.code
    });
  }
}
