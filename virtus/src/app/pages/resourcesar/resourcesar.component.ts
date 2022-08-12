import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {ActivatedRoute} from "@angular/router";
import {Utils} from "../../util/Utils";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-resourcesar',
  templateUrl: './resourcesar.component.html',
  styleUrls: ['./resourcesar.component.scss']
})
export class ResourcesarComponent implements OnInit {

  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  globalUri: string | null = "";
  resourcesData: any [];
  evaluationData: any [];

  newEvaluationsDialog: boolean;
  registerFormEvaluation: FormGroup;
  courseSuccessful = false;
  tiempo: any [];

  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    private utils: Utils,
    private _http: HttpClient,
    private formBuilder: FormBuilder) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.idTopic = this._route.snapshot.paramMap.get("idTopic");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app/coursear']},
      {label: 'Modulos', routerLink: ['/app/coursear/modulear/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule]},
      {
        label: 'Recursos y evaluaciones',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic]
      }
    ]);
    this.registerFormEvaluation = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        numberquestionEvaluation: ["", Validators.required],
        timeEvaluation: ["", Validators.required],
        timeminutesEvaluation: ["",]
      }
    );
  }

  ngOnInit(): void {
    this.tiempo = [
      {label: "Si", value: true},
      {label: "No", value: false}
    ]
    this.loadResources();
    this.loadEvaluations();
  }

  saveEvaluation() {
    console.log(this.form['timeEvaluation'].value);
  }

  resetEvaluation() {

  }

  get form() {
    return this.registerFormEvaluation.controls;
  }

  loadResources() {
    console.log(this.idTopic);
    this.apiLoadResources().subscribe(response => {
      console.log(response);
      this.resourcesData = response.data;
    })
  }

  loadEvaluations() {
    this.apiLoadEvaluations().subscribe(response => {
      console.log(response);
      this.evaluationData = response.data;
    });
  }

  apiLoadResources(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "resource/getresources";
    return this._http.post<any>(this.globalUri, {topic_id_resources: this.idTopic});
  }

  apiLoadEvaluations(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "evaluation/getevaluations";
    return this._http.post<any>(this.globalUri, {topic_id_evaluation: this.idTopic});
  }

}
