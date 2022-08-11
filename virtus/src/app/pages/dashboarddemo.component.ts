import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../app.breadcrumb.service';
import {Person} from "../models/Person";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Session} from "../models/session";

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {
  sessionLog: Session;
  globalUri: string = "";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _http: HttpClient
  ) {
    this.breadcrumbService.setItems([
      {label: 'Inicio', routerLink: ['/app']}
    ]);
  }

  ngOnInit() {
    console.log("ngOnInit Home")
    this.getHome();
    console.log(this.getHome())
  }

  getHome() {
    this.apiInformationHome();
  }

  apiInformationHome(): Observable<any> {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtusbk/utils/gethomeinformation";
    } else {
      this.globalUri = "virtus_bk/utils/gethomeinformation";
    }
    console.log(this.globalUri)
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('sessionToken', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiItMSIsInVzZXIiOjEsInBlcm1pdCI6IkEiLCJpYXQiOjE2NjAxNzQ4MTQsImV4cCI6MTY2MDE4NTYxNH0.YWq-CSsYc7y0p2AWRIECJmcym_tBVhTJ2xQJJDSfXv8')
    return this._http.post(this.globalUri, {
      "id_type": 1,
      "id_param": 1
    }, {'headers': headers});
  }

}
