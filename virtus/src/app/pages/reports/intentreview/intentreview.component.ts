import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../app.breadcrumb.service";
import {Person} from "../../../models/Person";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../../util/Utils";

@Component({
  selector: 'app-intentreview',
  templateUrl: './intentreview.component.html',
  styleUrls: ['./intentreview.component.scss']
})
export class IntentreviewComponent implements OnInit {
  globalUri: string | null = "";
  person: Person;
  persons: Person[];
  cols: any[];

  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private utils: Utils,
  ) {
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app/']},
      {label: 'Revisión de intento', routerLink: ['/app/reports/intentreview']},
    ]);
  }

  ngOnInit(): void {
    console.log(this.utils.token);
    this.loadgetPersons();

    this.cols = [
      {field: 'Calificación', header: 'Calificación'},
      {field: 'Calificación', header: 'Calificación'},
    ];
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

