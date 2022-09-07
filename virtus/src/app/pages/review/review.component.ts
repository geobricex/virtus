import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Utils} from "../../util/Utils";
import {Person} from "../../models/Person";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  globalUri: string | null = "";
  person: Person;
  persons: Person[];
  cols: any[];
  dataReviews: any;
  idEvaPers: string | null = "";

  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private utils: Utils,
              private _route: ActivatedRoute,) {
    this.idEvaPers = this._route.snapshot.paramMap.get("idReview");
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app/']},
      {label: 'Detalle de evaluación', routerLink: ['/app/reports/intentreview/review/' + this.idEvaPers]},
    ]);
  }

  ngOnInit(): void {
    if (this.idEvaPers != null) {
      this.loadgetReviews(this.idEvaPers)
    }
  }

  loadgetReviews(person_id_evaluation: any) {
    this.apiGetDataReview(4, person_id_evaluation).subscribe({
      next: response => {
        this.dataReviews = response.data;
        console.log(this.dataReviews);
      }
    })
  }

  apiGetDataReview(type: any, person_id_evaluation: any): Observable<any> {
    this.globalUri = this.utils.globalUrl + "personsevaluations/getpersonsevaluations";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    let queryParams = new HttpParams()
      .append("type", type)
      .append("id_evaluation", person_id_evaluation);
    return this._http.get<any>(this.globalUri, {params: queryParams, headers: headers});

  }

}
