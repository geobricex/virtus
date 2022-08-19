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

  globalUri: string | null = "";
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
    console.log(this.utils.token);
    this.loadgetPersons();
  }

  loadgetPersons() {
    this.apiLoadGetPersons().subscribe(response => {
      this.persons = response.data;
      console.log(response);
    });
  }

  apiLoadGetPersons(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "persons/personsget";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, {}, {headers: headers});
  }

  apiLoadTopics(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "topic/gettopics";
    return this._http.post<any>(this.globalUri,
      {syllabu_id_topic: 1});
  }

}
