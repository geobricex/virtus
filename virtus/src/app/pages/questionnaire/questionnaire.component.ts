import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, timer} from 'rxjs';
import {Person} from "../../models/Person";
import {Utils} from "../../util/Utils";

import {Evaluation, EvaluationQuestionsResponse, Questions} from "../../models/evaluation_questionarie";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';


declare var Artyom: any;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  valRadio: string;

  private artyom: any = new Artyom();

  private globalUri: string;

  //objeto de la evaluación
  public evaluationObject: Evaluation;
  public questionObject: Questions;
  public indexQuestionObject: number;

  //abecedario
  public alphabet: string[] = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"
  ];
  //
  public tiempoEvaluacion$: Subscription;
  public tiempoEvaluacion: string = "--:--";

  public literalSeleccionado: any;

  @ViewChild('canvas_response_rd') CanvasEl: ElementRef;
  private contex: CanvasRenderingContext2D | null;



  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private utils: Utils) {
    this.breadcrumbService.setItems([
      {label: 'Cuestionario', routerLink: ['/app/questionnaire']}
    ]);
  }

  ngOnInit(): void {
    this.obtenerPreguntas();

  }

  /*ngAfterViewInit(): void {
    // Call the method creating a child component of class 'ComponentA' inside the template
    console.log("ejecutar despues de terminar carga");
    this.startContinuousArtyom();
  }*/

  ngOnDestroy() {
    this.tiempoEvaluacion$.unsubscribe();
  }

  tipoPregunta(typo: number):string{
    let resp:string = "";
    if(typo == 1){
      resp = "Complete";
    }
    if(typo == 2){
      resp = "Simple Option";
    }
    if(typo == 3){
      resp = "Multiple Option";
    }
    if(typo == 4){
      resp = "Relate";
    }
    return resp;
  }

  totalPuntos(): number {
    let tpuntos: number = 0;
    for (let ind = 0; ind < this.evaluationObject.questions_.length; ind++) {
      if(this.evaluationObject.questions_[ind].points_question) {
        tpuntos += this.evaluationObject.questions_[ind].maximumpoints_question;
      }
    }
    return tpuntos;
  }

  getCountResueltas(): string {
    let total = this.evaluationObject.questions_.length;
    let respondidas = 0;
    for (let ind = 0; ind < total; ind++) {
      if (this.evaluationObject.questions_[ind].resuelto) {
        respondidas++;
      }
    }
    return respondidas + " / " + total;
  }

  getNivelQuestion(level: number): string {
    let resp = "Desconocido";
    if (level == 1) {
      resp = "Principiante";
    }
    if (level == 2) {
      resp = "Básico";
    }
    if (level == 3) {
      resp = "Medio";
    }
    if (level == 4) {
      resp = "Difícil";
    }
    if (level == 5) {
      resp = "Imposible";
    }
    return resp;
  }

  obtenerPreguntas(): void {
    let idEvaluacion: number = 1;
    //codigo para extraer de la url o veran donde
    this.obtenerPreguntasWS(idEvaluacion).subscribe(response => {
      console.log("obtenerPreguntasWS: ", response);
      if (response.status == 2) {
        if (response.data.length > 0) {
          this.evaluationObject = response.data[0];

          if (this.evaluationObject.time_evaluation) {
            this.tiempoEvaluacion$ = timer(0, 1000)
              .subscribe((iter: any) => {
                //this.time();
                //console.log("tiempoEvaluacion: " + iter);
                if (iter == (60 * 60)) {
                  this.tiempoEvaluacion$.unsubscribe();
                }
                let m = Math.floor(iter % 3600 / 60).toString().padStart(2, '0');
                let s = Math.floor(iter % 60).toString().padStart(2, '0');
                //console.log("tiempoEvaluacion: " + m + ":" + s);
                this.tiempoEvaluacion = m + ":" + s;
              });
          }
          this.cambiarPregunta(0);
          //this.startContinuousArtyom();
        }
      }
    });

  }

  cambiarPregunta(indice:number):void{
    this.indexQuestionObject = 0;
    this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    let rec:string =  this.questionObject.answers_[0].options_answer[0].resource!;
    this.questionObject.canResource = (rec.length > 0);
  }


  obtenerPreguntasWS(idEvaluacion: number): Observable<EvaluationQuestionsResponse> {
    let urlServicio: string;
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      urlServicio = "virtusbk/evaluation/getEvaluationQuestions";
    } else {
      urlServicio = "virtus_bk/evaluation/getEvaluationQuestions";
    }

    let headers = new HttpHeaders()
      //.set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);

    return this._http.post<EvaluationQuestionsResponse>(urlServicio, {"id_evaluation": idEvaluacion}, {headers: headers});
  }


  changeRadio(ind: number): void {
    console.log("cambio:", ind);
    console.log("todos:", this.questionObject.answers_[0]);
  }

  /*auto click*/
  autoClick(selector: string): void {
    let btnStart = document.querySelector(selector);
    if (btnStart) (btnStart as HTMLFormElement).click();
  }

  /*Paginar preguntas*/
  anteriorPregunta(): void {
    this.indexQuestionObject = this.indexQuestionObject + 1;
    if (this.indexQuestionObject >= this.evaluationObject.questions_.length) {
      this.indexQuestionObject = this.evaluationObject.questions_.length - 1;
    }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    this.cambiarPregunta(this.indexQuestionObject);
  }

  siguientePregunta(): void {
    console.log("siguiente pregunta");
    this.indexQuestionObject = this.indexQuestionObject - 1;
    if (this.indexQuestionObject < 0) {
      this.indexQuestionObject = 0;
    }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    this.cambiarPregunta(this.indexQuestionObject);
  }

  /*Video Player*/

  public btnVideoControl: any;

  initVideoControls(): void {
    this.btnVideoControl = document.querySelector("#pathurlsign_question");
  }

  playVideo() {
    this.initVideoControls();
    //console.log("play video",this.btnVideoControl,  (this.btnVideoControl != undefined));
    if (this.btnVideoControl) (this.btnVideoControl as HTMLFormElement)['play']();
  }

  pauseVideo() {
    this.initVideoControls();
    if (this.btnVideoControl) (this.btnVideoControl as HTMLFormElement)['pause']();
  }

  mutedVideo() {
    this.initVideoControls();
    if (this.btnVideoControl) {
      let actual: boolean =(this.btnVideoControl as HTMLFormElement)['muted'];
      (this.btnVideoControl as HTMLFormElement)['muted'] = !actual;
    }
  }

  evaluar(wildcard: string, i: number): void {
    console.log("wilcardOriginal:" + wildcard);
    wildcard = wildcard.trim().replace(/[^a-zA-Z]+/, "");
    console.log("wildcard:", wildcard, i, this.alphabet.indexOf(wildcard.trim()));
    if (this.alphabet.indexOf(wildcard.trim()) > -1) {
      //this.artyom.say("Ha indicado la selección del literal " + wildcard);
      console.log("Ha indicado la selección del literal " + wildcard);
      if (this.questionObject.name_questioncategory == "Simple Option") {
        this.autoClick("#option_rd_" + wildcard.trim());
      } else if (this.questionObject.name_questioncategory == "Simple Option") {
        this.autoClick("#option_chk_" + wildcard.trim());
      }

    } else {
      //this.artyom.say("No se encuentra ese literal");
      console.log("No se encuentra ese literal")
    }
  }


  /*Comandos de voz*/

  voiceComandsSupport():boolean{
    let microphoneApi: boolean = window.hasOwnProperty('webkitSpeechRecognition') && window.hasOwnProperty('speechSynthesis');
    return microphoneApi;
  }

  startContinuousArtyom(): void {

    this.artyom.fatality();

    let myGroup: any = {
      description: "Si el usuario indica un literal que se encuentra en la lista",
      smart: true, // Activar comando como un comando smart para poder usar comodines
      indexes: ["literal *", "opción *"],
      action: function (i: number, wildcard: string) {
        //let database: string[] = ["a", "b", "c", "d"];
        this.evaluar(wildcard, i);
      }
    };

    this.artyom.addCommands(myGroup);


    setTimeout(() => {
      //this.probarcomando();
      //let btnStart = document.querySelector("#btnStart");
      //if (btnStart) (btnStart as HTMLFormElement).click();
      this.autoClick("#btnStart");
    }, 5000);

    this.artyom.initialize({
      lang: "es-ES",
      continuous: true, // Artyom will listen forever
      debug: false, // Show what recognizes in the Console
      listen: true, // Start listening after this
      speed: 1, // Talk a little bit slow
      mode: "normal", // This parameter is not required as it will be normal by default,
      executionKeyword: "escucha"
    }).then(function () {
      console.log("artyom configurado...");
    });

  }

  leerPregunta(): void {
    let reader: string = "";
    reader += this.questionObject.description_question + " \n";
    for (let i = 0; i < this.questionObject.answers_[0].options_answer.length; i++) {
      reader += "literal " + this.alphabet[i] + " \n";
      reader += this.questionObject.answers_[0].options_answer[i].opcion + " \n";
    }
    //console.log(reader);
    this.artyom.say(reader);
  }

  /*Operaciones en canvas*/

  initCanvas(selector: string): void {
    let canvas = document.querySelector(selector);
    if (canvas) (canvas as HTMLFormElement);

    /**
     * kmkmkm
     */
    this.contex = (this.CanvasEl.nativeElement as HTMLCanvasElement)
      .getContext("2d");
    this.draw();

  }

  draw(): void {
    //Dibujar imagenes
  }
}
