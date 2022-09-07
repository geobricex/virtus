import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {
  Answers, AnswersModel,
  EvaluationModel,
  QuestionCategory,
  Questions,
  QuestionsModel
} from "../../models/evaluation_questionarie";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {type} from "os";
import {Utils} from "../../util/Utils";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "primeng/api";

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
  textComplete: string | null;

  literales: any [];

  registerFormQuestion: FormGroup;

  public objectQuestion = {} as QuestionsModel;
  public objetctEvaluation = {} as EvaluationModel;
  public objectQuestionCategory = {} as QuestionCategory;

  public objectAnswer = {} as AnswersModel;
  cant_piezas: any [];

  valRadio: string;
  options: any [];

  tmpFileRes: any;
  tmpFileQuest: any;
  globalUri: string = "";

  frmPhoto = new FormGroup({
    firstName: new FormControl()
  });
  urlimageupload: any;
  tmpFile: any;

  msgs: Message[] = [];

  // ESTRUCTURA PARA LAS RESPUESTAS DE LAS PREGUNTAS
  structure: any [];
  tmpfiles: any [];

  constructor(
    private _route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private _http: HttpClient
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
        routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule + '/resourcesar/' + this.idTopic + '/update_evaluation/' + this.idEvaluation]
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
    this.utils.initPocket();
    this.registerFormQuestion = this.formBuilder.group(
      {
        title_question: ["", Validators.required],
        description_question: ["", Validators.required],
        feedback_question: ["", Validators.required],
        hint_question: ["", Validators.required],
        level_question: [1, Validators.required],
        points_question: ["", Validators.required],
        maximumpoints_question: [""],
        pathurlfile_question: [""],
        pathurlsign_question: [""],
        pathurlvideo_question: [""]
      }
    );
    this.options = [
      {label: "---:---", value: null},
      {label: "Respuesta correcta", value: "Yes"},
      {label: "Respuesta incorrecta", value: "No"}
    ];
    this.literales = ["A", "B", "C", "D", "E", "F"];
    this.cant_piezas = [
      {label: "---:---", value: null},
      {label: "4", value: 4},
      {label: "9", value: 9},
      {label: "16", value: 16},
      {label: "25", value: 25},
      {label: "36", value: 36},
      {label: "49", value: 49},
      {label: "64", value: 64}
    ];
    this.validateAnswer(this.typeQuestion);
  }

  saveQuestion() {
    this.utils.loading;
    console.log(this.structure);
    this.objectQuestion.descriptionQuestion = this.form["description_question"].value;
    this.objectQuestion.feedbackQuestion = this.form["feedback_question"].value;
    this.objectQuestion.hintQuestion = this.form["hint_question"].value;
    this.objectQuestion.id = 0;
    this.objectQuestion.maximumpointsQuestion = this.form["maximumpoints_question"].value;
    this.objectQuestion.pathurlfileQuestion = this.form["pathurlfile_question"].value;
    this.objectQuestion.pathurlsignQuestion = this.form["pathurlsign_question"].value;
    this.objectQuestion.pathurlvideoQuestion = this.form["pathurlvideo_question"].value;
    this.objectQuestion.pointsQuestion = this.form["points_question"].value;
    this.objectQuestion.levelQuestion = this.levelQuestion;
    this.objectQuestion.stateQuestion = "";
    this.objectQuestion.titleQuestion = this.form["title_question"].value;
    this.objetctEvaluation.id = parseInt(this.idEvaluation === null ? "" : this.idEvaluation);
    this.objectQuestion.evaluationsIdEvaluation = this.objetctEvaluation;
    this.objectQuestionCategory.id = this.typeQuestion
    this.objectQuestion.questionCategoryIdQuestionCategory = this.objectQuestionCategory;
    console.log(this.objectQuestion);

    // guardar la imagen
    if (this.objectQuestion.pathurlfileQuestion !== "") {
      let urlPhoto: string = "";
      this.utils.changeImage(this.tmpFileQuest).then(response => {
        urlPhoto = this.utils.makePathRecurso(response);
        console.log(urlPhoto);
        this.objectQuestion.pathurlfileQuestion = urlPhoto;
        this.apiSaveQuestion().subscribe({
          next: response => {
            if (response.data.id_question !== 0) {
              console.log(response);
              // verificar si la pregunta permite archivos en las respuestas
              // console.log(this.structure);
              this.objectQuestion.id = response.data.id_question;
              this.objectAnswer.id = 0;
              this.objectAnswer.dateregAnswer = "";
              this.objectAnswer.dateupdateAnswer = "";
              this.objectAnswer.optionsAnswer = JSON.stringify(this.structure);
              this.objectAnswer.questionsIdQuestion = this.objectQuestion;
              this.apiSaveResponses().subscribe(response => {
                console.log(response);
                this.utils.showMessages(1, "Pregunta agregara correctamente.", "tst");
                this.registerFormQuestion.reset();
                this.validateAnswer(this.typeQuestion);
                this.urlimageupload = "";
                this.objectQuestion = {} as QuestionsModel;
                this.form["pathurlfile_question"].setValue("");
                this.utils.closeLoading;
              });
            } else {
              this.utils.showMessages(3, "Ocurrio un error.", "tst");
            }
          }
        })
      });
    } else {
      this.apiSaveQuestion().subscribe({
        next: response => {
          if (response.data.id_question !== 0) {
            console.log(response);
            // verificar si la pregunta permite archivos en las respuestas
            // console.log(this.structure);
            this.objectQuestion.id = response.data.id_question;
            this.objectAnswer.id = 0;
            this.objectAnswer.dateregAnswer = "";
            this.objectAnswer.dateupdateAnswer = "";
            this.objectAnswer.optionsAnswer = JSON.stringify(this.structure);
            this.objectAnswer.questionsIdQuestion = this.objectQuestion;
            this.apiSaveResponses().subscribe(response => {
              console.log(response);
              this.utils.showMessages(1, "Pregunta agregara correctamente.", "tst");
              this.registerFormQuestion.reset();
              this.validateAnswer(this.typeQuestion);
              this.form["pathurlfile_question"].setValue("");
              this.utils.closeLoading;
            });
          } else {
            this.msgs = [];
            this.utils.showMessages(3, "Ocurrio un error.", "tst");
          }
        }
      });
    }
  }

  apiSaveQuestion(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "question/insertquestion";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post<any>(this.globalUri, this.objectQuestion, {headers: headers});
  }

  apiSaveResponses(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "answer/insertanswer";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post<any>(this.globalUri, this.objectAnswer, {headers: headers});
  }

  resetQuestion() {
    this.registerFormQuestion.reset();
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
    });
    this.tmpfiles.push({tmp: null});
  }

  validateOptionUnique(index: number) {
    this.structure[index].correct = "Yes";
    for (let i = 0; i < this.structure.length; i++) {
      if (i !== index) {
        this.structure[i].correct = "No";
      }
    }
  }

  uploadFileResp(event: any, index: number) {
    event.target.files.length > 0;
    const file = event.target.files[0];
    console.log(file);
    this.tmpfiles[index].tmp = file
    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpfiles[index].tmp).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.structure[index].resource = urlPhoto;
    });
  }

  uploadFileQuest(event: any) {
    event.target.files.length > 0;
    const file = event.target.files[0];
    console.log(file);
    this.tmpFileQuest = file;
    this.form["pathurlfile_question"].setValue(this.tmpFileQuest.name);
  }

  // metodos para la estructura de relcionar
  addNewAlternativeRel() {
    if (this.structure.length > 5) {
      alert("no puedes agregar mas items");
      return;
    }

    this.structure.push({
      "rightSide": "Texto de prueba",
      "resourse_rightSide": "",
      "leftSide": "Texto de prueba",
      "resourse_leftSide": ""
    });

    this.tmpfiles.push({tmpright: null}, {tmpleft: null});
  }

  uploadFileRespR(event: any, index: number) {
    event.target.files.length > 0;
    const file = event.target.files[0];
    console.log(file);
    this.tmpfiles[index].tmpright = file
    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpfiles[index].tmpright).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.structure[index].resourse_rightSide = urlPhoto;
    });
  }

  uploadFileRespL(event: any, index: number) {
    event.target.files.length > 0;
    const file = event.target.files[0];
    console.log(file);
    this.tmpfiles[index].tmpleft = file
    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpfiles[index].tmpleft).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.structure[index].resourse_leftSide = urlPhoto;
    });
  }

  // metodos para la estructura de puzzle
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
      //this.structure[0].resource =
      this.frmPhoto.patchValue({
        field: file
      });
      let urlPhoto: string = "";
      this.utils.changeImage(this.tmpFile).then(response => {
        urlPhoto = this.utils.makePathRecurso(response);
        this.structure[0].resource = urlPhoto;
      });
    }
  }

  // metodos para completar
  addOption() {
    let text_description = document.getElementsByName("descriptionText");
    console.log(this.structure[0].description_question);
    this.insertAtCursor(text_description[0], "[ingresa aqui la palabra correcta]");
  }

  addDistractor() {
    this.structure[0].options.push({
      "option": "",
      "resource": ""
    });
  }

  insertAtCursor(myField: any, myValue: string) {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos)
      + myValue
      + myField.value.substring(endPos, myField.value.length);
  }

  deleteAlternative(index: number) {
    console.log(index)
    this.structure.splice(index, 1);
    this.tmpfiles.splice(index, 1);
  }

  validateAnswer(typeQuestion: number) {
    this.structure = [];
    this.tmpfiles = [];
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
      this.tmpfiles.push({tmp: null});
    } else if (this.typeQuestion === 7) {
      this.structure.push({
        "opcion": "TEXTO DE PRUEBA"
      });
    } else if (this.typeQuestion === 5) {
      this.structure.push(
        {
          "rightSide": "Texto de prueba",
          "resourse_rightSide": "",
          "leftSide": "Texto de prueba",
          "resourse_leftSide": ""
        }
      );
      this.tmpfiles.push({tmpright: null}, {tmpleft: null});
    } else if (this.typeQuestion === 6) {
      this.structure.push({
        "resource": "",
        "piece_questionarie": 0
      });
      this.tmpfiles.push({tmp: null});
    } else if (this.typeQuestion === 4) {
      this.structure.push({
        "description_question": "texto de prueba",
        "description_question_R": "texto de prueba",
        "options": []
      });
    }
  }

  get form() {
    return this.registerFormQuestion.controls;
  }

}
