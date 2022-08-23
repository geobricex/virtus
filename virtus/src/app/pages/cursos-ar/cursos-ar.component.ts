import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Observable} from "rxjs";
import {Course} from "../../models/Course";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';

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
  course: Course;
  courses: Course[];
  sortOrder: number;
  sortField: string;
  tmpFile: any;
  urlimageupload: any;
  idiomas: any [];

  infoCourseSelected: any = {};
  informationCourse: boolean;

  expandedRows: any = {};
  isExpanded: boolean = false;

  reegisterFormCourse: FormGroup;
  courseSuccessful = false;

  frmPhoto = new FormGroup({
    firstName: new FormControl()
  });

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _http: HttpClient,
    private formBuilder: FormBuilder,
    private utils: Utils) {
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app']},
      {label: 'Cursos Activos', routerLink: ['/app/coursear']}
    ]);
  }

  ngOnInit(): void {
    this.idiomas = [
      {label: "---:---", value: null},
      {label: "Español", value: "es"},
      {label: "English", value: "en"}
    ]
    this.utils.initPocket();
    this.loadCourse();
    this.reegisterFormCourse = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        keywords: ["", Validators.required],
        language: ["", Validators.required]
      }
    );
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

  get form() {
    return this.reegisterFormCourse.controls;
  }

  loadCourse() {
    this.apiLoadCourses().subscribe(response => {
      this.courses = response;
      console.log(this.courses);
    });
  }

  apiLoadCourses(): Observable<Course[]> {
    // this.globalUri = this.utils.globalUrl + "course";
    this.globalUri = this.utils.globalUrl + "course/getcoursestatus?status_course=A";
    return this._http.get<Course[]>(this.globalUri, {});
  }

  saveCourse() {
    this.courseSuccessful = true;

    if (this.reegisterFormCourse.invalid) {
      return;
    }

    console.log(this.form['name'].value);
    console.log(this.form['description'].value);
    console.log(this.form['keywords'].value);
    console.log(this.form['language'].value);
    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpFile).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.course = new Course(
        0,
        this.form['name'].value,
        this.form['description'].value,
        this.form['keywords'].value,
        urlPhoto, "", "",
        "", this.form['language'].value, "0.0"
      );
      this.apiSaveCoruse(this.course).subscribe(response => {
        console.log(response);
        this.utils.showMessages(response.status, response.information, "tst");
        this.resetCourse();
        this.loadCourse();
      });
    });

  }

  apiSaveCoruse(course: Course): Observable<any> {
    this.globalUri = this.utils.globalUrl + "course/insertcourse";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, course, {headers: headers});
  }

  resetCourse() {
    this.courseSuccessful = false;
    this.urlimageupload = "";
    this.reegisterFormCourse.reset();
    this.newcourse_dialog = false;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.urlimageupload = reader.result;
      }

      const objectURL = URL.createObjectURL(file);
      this.urlimageupload = objectURL;
      console.log(objectURL)
      this.tmpFile = file;
      this.frmPhoto.patchValue({
        field: file
      });
    }
  }


  openNew() {
    this.newcourse_dialog = true;
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
