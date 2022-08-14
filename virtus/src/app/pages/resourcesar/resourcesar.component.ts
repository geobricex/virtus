import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {ActivatedRoute} from "@angular/router";
import {Utils} from "../../util/Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Evaluation} from "../../models/Evaluation";
import {Topic} from "../../models/topic";

@Component({
  selector: 'app-resourcesar',
  templateUrl: './resourcesar.component.html',
  styleUrls: ['./resourcesar.component.scss']
})
export class ResourcesarComponent implements OnInit {

  evaluation: Evaluation;
  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  globalUri: string | null = "";
  resourcesData: any [];
  evaluationData: any [];
  tmpFile: any;

  newEvaluationsDialog: boolean;
  newResourseDialog: boolean;
  registerFormEvaluation: FormGroup;
  registerFormResources: FormGroup;
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
    this.registerFormResources = this.formBuilder.group(
      {
        fileName: ["", Validators.required],
        nameResources: ["", Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.tiempo = [
      {label: "---:---", value: null},
      {label: "Si", value: true},
      {label: "No", value: false}
    ]
    this.loadResources();
    this.loadEvaluations();
  }

  saveResources() {

  }

  apiSaveResources(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "resource/insertresource";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, this.evaluation, {headers: headers});
  }

  resetResources() {
    this.newResourseDialog = false;
    this.registerFormResources.reset();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      if (file.type === "application/pdf" || file.type === "video/mp4" || file.type === "video/mp3") {
        this.tmpFile = file;
        this.formR['fileName'].setValue(file.name);
        this.utils.showMessages(2, "Archivo: " + file.name + " cargado exitosamente.", "tst");
      } else {
        this.formR['fileName'].setValue("");
        this.utils.showMessages(1, "Formato de archivo no permitido.", "tst");
      }
    }
  }

  saveEvaluation() {
    if (!this.form['timeEvaluation'].value) {
      this.form['timeminutesEvaluation'].setValue(0);
    }

    console.log(this.form['name'].value);
    console.log(this.form['description'].value);
    console.log(this.form['numberquestionEvaluation'].value);
    console.log(this.form['timeEvaluation'].value);
    console.log(this.form['timeminutesEvaluation'].value);

    this.evaluation = new Evaluation(
      0,
      this.form['name'].value,
      this.form['description'].value,
      "", "",
      this.form['timeEvaluation'].value,
      this.form['timeminutesEvaluation'].value,
      this.form['numberquestionEvaluation'].value,
      ""
    )
    let topicAux: Topic;
    topicAux = new Topic(
      parseInt(this.idTopic === null ? "0" : this.idTopic),
      "", "", "", "",
      "", "", "", "")
    this.evaluation._levelsIdLevels = topicAux;
    console.log(this.evaluation);
    this.apiSaveEvaluation().subscribe(response => {
      console.log(response);
      this.utils.showMessages(response.status, response.information, "tst");
      this.loadEvaluations();
      this.resetEvaluation();
    });
  }

  apiSaveEvaluation(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "evaluation/insertevaluation";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUri, this.evaluation, {headers: headers});
  }

  resetEvaluation() {
    this.registerFormEvaluation.reset();
    this.newEvaluationsDialog = false;
  }

  get form() {
    return this.registerFormEvaluation.controls;
  }

  get formR() {
    return this.registerFormResources.controls;
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
