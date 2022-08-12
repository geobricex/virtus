import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Topic} from "../../models/topic";
import {ActivatedRoute} from "@angular/router";
import {Utils} from "../../util/Utils";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  temas: Topic[];
  sortOrder: number;
  sortField: string;
  idCourse: string | null = "";
  idModule: string | null = "";
  globalUri: string | null = "";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    private utils: Utils,
    private _http: HttpClient) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule]}
    ]);
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics() {
    this.apiLoadTopics().subscribe(response => {
      console.log(response);
      this.temas = response.data;
    });
  }

  apiLoadTopics(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "topic/gettopics";
    return this._http.post<any>(this.globalUri,
      {syllabu_id_topic: this.idModule});
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
