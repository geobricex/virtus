import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Modulo} from "../../models/modulo";
import {Observable} from "rxjs";
import {Utils} from "../../util/Utils";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit {

  modules: Modulo[];
  sortOrder: number;
  sortField: string;
  globalUri: string = "";
  idCourse: string | null = "";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utils: Utils, private _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules']}
    ]);
  }

  ngOnInit(): void {
    this.loadModule();
  }

  loadModule() {
    this.apiLoadModule().subscribe(response => {
      console.log(response);
      this.modules = response.data;
      console.log(this.modules)
    });
  }

  apiLoadModule(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "syllabu/getsyllabus";
    return this._http.post<any>(this.globalUri,
      {course_id_syllabu: this.idCourse});
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
