import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Answers, Questions} from "../../models/evaluation_questionarie";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {type} from "os";

@Component({
  selector: 'app-question-nu',
  templateUrl: './question-nu.component.html',
  styleUrls: ['./question-nu.component.scss']
})
export class QuestionNuComponent implements OnInit {

  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  idEvaluation: string | null = "";
  typeQuestion: number;
  levelQuestion: number = 1;

  literales: any [];

  registerFormQuestion: FormGroup;

  objectQuestion: Questions;
  objectAnswer: Answers;

  valRadio: string;
  options: any [];

  // ESTRUCTURA PARA LAS RESPUESTAS DE LAS PREGUNTAS
  structure: any [];

  constructor(
    private _route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder
  ) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.idTopic = this._route.snapshot.paramMap.get("idTopic");
    this.idEvaluation = this._route.snapshot.paramMap.get("idResource");
    let type: string | null = this._route.snapshot.paramMap.get("type");
    this.typeQuestion = parseInt(type !== null ? type : "0");
    console.log("tipo de pregunta ", this.typeQuestion);
    this.breadcrumbService.setItems([
      {
        label: '',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic + '/updatequecust/' + this.idEvaluation]
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
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic + '/updatequecust/' + this.idEvaluation]
      },
      {
        label: 'Pregunta',
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/'
        + this.idTopic + '/updatequecust/' + this.idEvaluation + '/question_nu/' + this.typeQuestion]
      }
    ]);
  }

  ngOnInit(): void {
    this.registerFormQuestion = this.formBuilder.group(
      {
        title_question: ["", Validators.required],
        description_question: ["", Validators.required],
        feedback_question: ["", Validators.required],
        hint_question: ["", Validators.required],
        level_question: [this.levelQuestion, Validators.required],
        points_question: ["", Validators.required],
        maximumpoints_question: ["", Validators.required],
        pathurlfile_question: ["", Validators.required],
        pathurlsign_question: ["", Validators.required],
        pathurlvideo_question: ["", Validators.required]
      }
    );
    this.options = [
      {label: "---:---", value: null},
      {label: "Respuesta correcta", value: "Yes"},
      {label: "Respuesta incorrecta", value: "No"}
    ];
    this.literales = ["A", "B", "C", "D", "E", "F"];
    this.validateAnswer(this.typeQuestion);
  }

  // metodos para la opcion de verdadero y falso
  changeOption(value: any) {
    console.log(this.valRadio);
    this.structure[0].opcion = this.valRadio.split("/")[0];
    this.structure[1].opcion = this.valRadio.split("/")[1];
  }

  // metodos para la opcion unica y multiples
  addNewAlternative() {
    if (this.structure.length > 5) {
      alert("no puedes agregar mas items");
      return;
    }

    this.structure.push({
      "opcion": "Opcion " + (this.structure.length + 1),
      "correct": "No",
      "resource": ""
    })
  }

  validateOptionUnique(index: number) {
    this.structure[index].correct = "Yes";
    for (let i = 0; i < this.structure.length; i++) {
      if (i !== index) {
        this.structure[i].correct = "No";
      }
    }
  }

  deleteAlternative(index: number) {
    console.log(index)
    this.structure.splice(index, 1);
  }

  validateAnswer(typeQuestion: number) {
    this.structure = [];
    if (typeQuestion === 1) {
      this.valRadio = "Verdadero/Falso";
      this.structure.push(
        {
          "opcion": this.valRadio.split("/")[0],
          "correct": "Yes"
        },
        {
          "opcion": this.valRadio.split("/")[1],
          "correct": "No"
        }
      );
    } else if (typeQuestion === 2 || typeQuestion === 3) {
      this.structure.push({
        "opcion": "Opcion 1",
        "correct": "No",
        "resource": ""
      })
    }
  }

  get form() {
    return this.registerFormQuestion.controls;
  }

}
