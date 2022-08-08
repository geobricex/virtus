import {Component, OnInit} from '@angular/core';

import {BreadcrumbService} from '../../app.breadcrumb.service';
import {Course} from "../../models/Course";

import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";
import {Person} from "../../models/Person";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class CursosComponent implements OnInit {

  courses: Course[];
  sortOrder: number;
  sortField: string;
  globalUri: string = "";

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utils: Utils,
    private _http: HttpClient) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Todos los cursos', routerLink: ['/app/course']}
    ]);
  }

  ngOnInit(): void {
    this.apiLoadCourses().subscribe(response => {
      this.courses = response;
      console.log(this.courses);
    });
  }

  apiLoadCourses(): Observable<Course[]> {
    this.globalUri = "virtusbk/course";
    return this._http.get<Course[]>(this.globalUri, {});
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
