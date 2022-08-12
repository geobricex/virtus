import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {Course} from "../../models/Course";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";
import {Observable} from "rxjs";

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.component.html',
  styleUrls: ['./miscursos.component.scss']
})
export class MiscursosComponent implements OnInit {

  courses: Course[];

  sortOrder: number;
  sortField: string;
  globalUri: string = "";
  infoCourseSelected: any = {};
  informationCourse: boolean;

  expandedRows: any = {};
  isExpanded: boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private utils: Utils, private _http: HttpClient) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']}
    ]);
  }

  ngOnInit(): void {
    this.loadMyCourse();
  }

  expandAll() {
    if (!this.isExpanded) {
      let module: any = {};
      this.infoCourseSelected.syllabus_.forEach((module: { id_course: string | number; }) => this.expandedRows[module.id_course] = true);

    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  saberMas(idCourse: any) {
    console.log(idCourse)
    this.apiSaberMas(idCourse).subscribe(response => {
      console.log(response);
      this.infoCourseSelected = response.data[0];
      console.log(this.infoCourseSelected);
      this.informationCourse = true;
    });
  }

  apiSaberMas(idCourse: any): Observable<any> {
    this.globalUri = this.utils.globalUrl + "course/selectcoursesyllabutopic";
    return this._http.post(this.globalUri, {id_course: idCourse});
  }

  loadMyCourse() {
    this.apiLoadMyCourse().subscribe(response => {
      console.log(response);
      this.courses = response.data;
    });
  }

  apiLoadMyCourse(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "personscours/mycoursejoin";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, {state_course_person: "A"}, {headers: headers});
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
