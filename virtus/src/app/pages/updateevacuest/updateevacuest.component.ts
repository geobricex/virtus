import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Utils} from "../../util/Utils";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-updateevacuest',
  templateUrl: './updateevacuest.component.html',
  styleUrls: ['./updateevacuest.component.scss']
})
export class UpdateevacuestComponent implements OnInit {

  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  idResource: string | null = "";
  globalUrl: string = "";
  typeEvalutionform: any[];

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
    this.idResource = this._route.snapshot.paramMap.get("idResource");
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
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic + '/updatequecust/' + this.idResource]
      }
    ]);
    console.log(this.idResource);
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
    this.typeEvalutionform = [
      {label: "---:---", value: null},
      {label: "Evaluación", value: 1},
      {label: "Cuestionario", value: 2},
    ]
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

  apiLoadDataEvaluation(): Observable<any> {
    this.globalUrl = this.utils.globalUrl + "evaluation/getevaluation";
    return this._http.post(this.globalUrl, {"id_evaluation": parseInt(typeof this.idResource === "string" ? this.idResource : "0")});
  }

}
