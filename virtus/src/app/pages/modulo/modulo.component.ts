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
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class ModuloComponent implements OnInit {

  modules: Modulo[];
  sortOrder: number;
  sortField: string;
  globalUri: string = "";
  idCourse: string | null = "";
  statusApi: number = 0;
  loading: boolean = true;
  sortOptions: any [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utils: Utils, private _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app/mycourse']},
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Módulos', routerLink: ['/app/mycourse/modules']}
    ]);
  }

  ngOnInit(): void {
    this.loadModule();
    this.sortOptions = [
      {label: 'Nombre curso A-Z', value: 'name_syllabu'},
      {label: 'Nombre curso Z-A', value: '!name_syllabu'},
      {label: 'Mas antiguos', value: 'datereg_syllabu'},
      {label: 'Ultimos agregados', value: '!datereg_syllabu'}
    ];
  }

  get getUtils() {
    return this.utils
  }

  loadModule() {
    this.loading = true;
    this.apiLoadModule().subscribe({
      next: response => {
        console.log(response);
        this.statusApi = response.status;
        if (response.status == 2)
          this.modules = response.data;
        console.log(this.modules);
        this.loading = false;
      },
      error: err => {
        console.log(err);
        console.log("Error interno de servidor");
      }
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
