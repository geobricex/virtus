import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";
import {Person} from "../../models/Person";

@Component({
  selector: 'app-useradministration',
  templateUrl: './useradministration.component.html',
  styleUrls: ['./useradministration.component.scss']
})
export class UseradministrationComponent implements OnInit {

  globalUri: string = "";
  person: Person;
  persons: Person[];


  constructor(
    private breadcrumbService: BreadcrumbService,
    private _http: HttpClient,
    private utils: Utils,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Gestión de Usuario', routerLink: ['/app/useradministration']},
    ]);
  }

  ngOnInit(): void {
    this.loadgetPersons();
  }



  loadPersons() {
    this.apiLoadPersons().subscribe(response => {
      this.persons = response;
      console.log(this.persons);
    });
  }

  apiLoadPersons(): Observable<Person[]> {
    this.globalUri = this.utils.globalUrl + "persons/getpersons";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('token', this.utils.token);
    return this._http.post<Person[]>(this.globalUri,
      {sessionToken: this.utils.token},
      {headers: headers});
  }

  loadgetPersons() {
    this.apiLoadGetPersons().subscribe(response => {
      this.persons = response.data;
      console.log(this.persons);
    });
  }

  apiLoadGetPersons(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "personscours/getpersons";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, {sessionToken: this.utils.token}, {headers: headers});
  }
}
