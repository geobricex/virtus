import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../app.breadcrumb.service';
import {Person} from "../models/Person";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Session} from "../models/session";
import {StorageService} from "../authentication/StorageService";
import {Utils} from "../util/Utils";

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

  globalUri: string = "";
  homedata: any = [];
  statusApi: number = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _http: HttpClient,
    private storageService: StorageService,
    private utils: Utils
  ) {
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app']},
      {label: 'Inicio', routerLink: ['/app']}
    ]);
  }

  ngOnInit() {
    console.log("ngOnInit Home");
    this.homedata = [];
    this.statusApi = 0;
    this.apiInformationHome().subscribe({
      next: response => {
        console.log(response);
        this.statusApi = response.status;
        this.homedata = response.data[0];
      }
    })
  }


  apiInformationHome(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "utils/gethomeinformation";
    console.log(this.globalUri)
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, {
      "id_type": this.utils.getUserSession().type_person === "A" || this.utils.getUserSession().type_person === "R" ? 2 : 1,
    }, {'headers': headers});
  }

}
