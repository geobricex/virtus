import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../util/Utils";
import {Observable} from "rxjs";
import {Course} from "../../models/Course";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Modules} from "../../models/Modules";


@Component({
  selector: 'app-moduloar',
  templateUrl: './moduloar.component.html',
  styleUrls: ['./moduloar.component.scss']
})
export class ModuloarComponent implements OnInit {

  module: Modules;
  modules: Modules[];
  sortOrder: number;
  sortField: string;
  newModuleDialog: boolean;
  globalUri: string = "";
  idCourse: string | null = "";
  urlimageupload: any;
  tmpFile: any;
  loading: boolean = true;
  loadingDataCourse: boolean = true;
  dataCourse: any;

  registerFormModule: FormGroup;
  moduleSuccessful = false;

  frmPhoto = new FormGroup({
    firstName: new FormControl()
  });

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utils: Utils,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app/coursear']},
      {label: 'Módulos', routerLink: ['/app/coursear/modulear/' + this.idCourse]}
    ]);
  }

  ngOnInit(): void {
    this.utils.initPocket();
    this.loadCourse();
    this.registerFormModule = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        keywords: ["", Validators.required]
      }
    );
    this.loadDataCourse();
  }

  loadDataCourse() {
    this.loadingDataCourse = true;
    this.apiGetDataCourse(this.idCourse).subscribe({
      next: response => {
        console.log(response);
        this.dataCourse = response;
        console.log(this.dataCourse);
        this.loadingDataCourse = false;
      }
    })
  }

  apiGetDataCourse(id: any): Observable<any> {
    this.globalUri = this.utils.globalUrl + "course/getCourseData";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this._http.get<any>(this.globalUri, {params: queryParams});
  }

  saveModule() {
    this.moduleSuccessful = true;

    if (this.registerFormModule.invalid) {
      return;
    }

    console.log(this.form['name'].value);
    console.log(this.form['description'].value);
    console.log(this.form['keywords'].value);
    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpFile).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.module = new Modules(
        0,
        this.form['name'].value,
        this.form['description'].value,
        this.form['keywords'].value,
        urlPhoto, "", "", ""
      )
      let courseAux = new Course(parseInt(this.idCourse === null ? "0" : this.idCourse),
        "", "", "", "",
        "", "", "", "", "");
      this.module._coursesIdCourse = courseAux;
      console.log(this.module)
      this.apiSaveCourse(this.module).subscribe(response => {
        this.utils.showMessages(response.status, response.information, "tst");
        this.loadCourse();
        this.resetModule();
      });
    });

  }

  resetModule() {
    this.newModuleDialog = false;
    this.moduleSuccessful = false;
    this.registerFormModule.reset();
  }

  openNew() {
    this.newModuleDialog = true;
  }

  loadCourse() {
    this.loading = true;
    this.apiLoadCourses().subscribe(response => {
      console.log(response);
      this.modules = response.data;
      this.loading = false;
    });
  }

  apiLoadCourses(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "syllabu/getsyllabus";
    return this._http.post<any>(this.globalUri,
      {course_id_syllabu: this.idCourse});
  }

  apiSaveCourse(module: Modules): Observable<any> {
    this.globalUri = this.utils.globalUrl + "syllabu/insertsyllabu";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post<any>(this.globalUri, module, {headers: headers});
  }

  get form() {
    return this.registerFormModule.controls;
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
