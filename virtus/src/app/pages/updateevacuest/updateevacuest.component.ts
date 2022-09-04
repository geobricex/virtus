import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Utils} from "../../util/Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Evaluation, EvaluationQuestionsResponse, Questions} from "../../models/evaluation_questionarie";

@Component({
  selector: 'app-updateevacuest',
  templateUrl: './updateevacuest.component.html',
  styleUrls: ['./updateevacuest.component.scss']
})
export class UpdateevacuestComponent implements OnInit {

  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  idEvaluation: number;
  globalUrl: string = "";
  typeEvalutionform: any[];
  new_question_dialog: boolean = false;
  quantity_true: number;

  public evaluationObject: Evaluation;
  public questionObject: Questions;

  frmEvaliationCuestionary: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private utils: Utils,
    private _http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.idTopic = this._route.snapshot.paramMap.get("idTopic");
    let idEvaluation_string: string | null = this._route.snapshot.paramMap.get("idResource");
    this.idEvaluation = parseInt(idEvaluation_string !== null ? idEvaluation_string : "0");
    this.breadcrumbService.setItems([
      {
        label: '',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic]
      },
      {label: 'Cursos', routerLink: ['/app/coursear']},
      {label: 'Módulos', routerLink: ['/app/coursear/modulear/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule]},
      {
        label: 'Recursos y evaluaciones',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic]
      },
      {
        label: 'Edicion de cuestionarios/evaluaciones',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic + '/update_evaluation/' + this.idEvaluation]
      }
    ]);
    console.log(this.idEvaluation);
    this.frmEvaliationCuestionary = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        timeEvaluation: ["", Validators.required],
        timeminutesEvaluation: ["",],
        typeEvaluation: ["", Validators.required],
        opportunityEvaluation: ["", Validators.required],
        opportunitiesEvaluation: [""]
      }
    );
  }

  ngOnInit(): void {
    this.loadEvaluations();
    this.loadQuestions();
    this.typeEvalutionform = [
      {label: "---:---", value: null},
      {label: "Evaluación", value: 1},
      {label: "Cuestionario", value: 2},
    ]
  }

  updateQuantityQuestions(idcategory: number) {
    this.utils.loading;
    this.apiUpdateQuantityQuestions(idcategory).subscribe({
      next: response => {
        console.log(response);
        this.quantity_true = 0;
        this.utils.showMessages(response.status, response.information, "tst")
        this.utils.closeLoading;
      }
    })
  }

  apiUpdateQuantityQuestions(idcategory: number): Observable<any> {
    console.log(this.quantity_true);
    let url_gq: string;
    url_gq = this.utils.globalUrl;
    url_gq += "evaluation/updateQuantityQuestions";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);

    return this._http.post<any>(url_gq, {
      "quantity_question": this.quantity_true,
      "id_evaluation": (String(this.idEvaluation)),
      "id_question_category": String(idcategory)
    }, {headers: headers});
  }

  get form() {
    return this.frmEvaliationCuestionary.controls;
  }

  loadEvaluations() {
    this.apiLoadDataEvaluation().subscribe({
      next: response => {
        console.log(response);
        this.form["name"].setValue(response.data[0].name_evaluation);
        this.form["description"].setValue(response.data[0].description_evaluation);
        this.form["typeEvaluation"].setValue(response.data[0].type_evaluation);
        this.form["timeEvaluation"].setValue(response.data[0].time_evaluation);
        this.form["timeminutesEvaluation"].setValue(response.data[0].timeminutes_evaluation);
        this.form["opportunityEvaluation"].setValue(response.data[0].opportunity_evaluation);
        this.form["opportunitiesEvaluation"].setValue(response.data[0].opportunities_evaluation);
      }
    })
  }

  loadQuestions() {
    this.apiGetQuestions(this.idEvaluation).subscribe({
      next: response => {
        if (response.status == 2) {
          if (response.data.length > 0) {
            this.evaluationObject = response.data[0];
            console.log(this.evaluationObject);
          }
        }
      }
    });
  }

  apiLoadDataEvaluation(): Observable<any> {
    this.globalUrl = this.utils.globalUrl + "evaluation/updateQuantityQuestions";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post(this.globalUrl, {
      "quantity_question": this.idEvaluation,
      "id_evaluation": "",
      "id_question_category": ""
    }, {headers: headers});
  }

  apiGetQuestions(idEvaluation: number): Observable<EvaluationQuestionsResponse> {
    let url_gq: string;
    url_gq = this.utils.globalUrl;
    url_gq += "evaluation/getAllEvaluationQuestions";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);

    return this._http.post<EvaluationQuestionsResponse>(url_gq, {"id_evaluation": idEvaluation}, {headers: headers});
  }

  tipoPregunta(typo: number): string {
    let resp: string = "";
    if (typo == 1) {
      resp = "True or False";
    }
    if (typo == 2) {
      resp = "Simple Option";
    }
    if (typo == 3) {
      resp = "Multiple Option";
    }
    if (typo == 4) {
      resp = "Complete";
    }
    if (typo == 5) {
      resp = "Relate";
    }
    if (typo == 6) {
      resp = "Puzzle";
    }
    if (typo == 7) {
      resp = "Build word";
    }
    return resp;
  }

}
