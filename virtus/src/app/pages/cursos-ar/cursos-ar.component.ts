import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Observable} from "rxjs";
import {Course} from "../../models/Course";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../../util/Utils";

@Component({
  selector: 'app-cursos-ar',
  templateUrl: './cursos-ar.component.html',
  styleUrls: ['./cursos-ar.component.scss']
})
export class CursosArComponent implements OnInit {

  newcourse_dialog: boolean;
  globalUri: string = "";
  courses: Course[];
  sortOrder: number;
  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService, private _http: HttpClient) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app/coursear']}
    ]);
  }

  ngOnInit(): void {
    this.apiLoadCourses().subscribe(response => {
      this.courses = response;
      console.log(this.courses);
    });
  }

  openNew() {
    this.newcourse_dialog = true;
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
