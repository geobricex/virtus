import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../app.breadcrumb.service";
import {Person} from "../../../models/Person";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
  dataReviews: any;

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
    this.loadgetReviews();

    this.cols = [
      {field: 'Calificación', header: 'Calificación'},
      {field: 'Calificación', header: 'Calificación'},
    ];
  }

  loadgetReviews() {
    console.log("DATA EVALUATION")
    this.apiGetDataReview(3).subscribe({
      next: response => {
        this.dataReviews = response.data;
        console.log( this.dataReviews);
      }
    })
  }

  apiGetDataReview(type: any): Observable<any> {
    this.globalUri = this.utils.globalUrl + "personsevaluations/getpersonsevaluations";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    let queryParams = new HttpParams()
      .append("type", type)
      .append("id_evaluation", 0);
    return this._http.get<any>(this.globalUri, {params: queryParams, headers: headers});

  }

}

