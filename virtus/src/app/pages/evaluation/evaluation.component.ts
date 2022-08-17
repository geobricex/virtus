import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, timer} from 'rxjs';
import {Person} from "../../models/Person";
import {Utils} from "../../util/Utils";
import {ActivatedRoute} from '@angular/router';
import {
  Evaluation,
  EvaluationQuestionsResponse,
  QuestionModel
} from "../../models/evaluation_questionarie";
import {StorageService} from "../../authentication/StorageService";
import {FormBuilder} from '@angular/forms'

declare var Artyom: any;

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  idEvaluation: string | null = "";
  idResource: string | null = "";
  //valRadio: string;


  private artyom: any = new Artyom();

  private globalUri: string;

  //objeto de la evaluación
  public evaluationObject: Evaluation;
  public questionObject: QuestionModel;

  /*public questionObjectSimpleOption: PleOption;
  public questionObjectMultileOption: PleOption;
  public questionObjectComplete: Complete;
  public questionObjectRelate: Relate;*/


  public indexQuestionObject: number;

  //abecedario
  public alphabet: string[] = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"
  ];
  //
  public tiempoEvaluacion$: Subscription;
  public tiempoEvaluacion: number = 0;

  public literalSeleccionado: any;

  @ViewChild('canvasEl', {static: true}) CanvasEl: ElementRef<HTMLCanvasElement>;
  private contex: CanvasRenderingContext2D | null;


  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private _route: ActivatedRoute,
              private utils: Utils,
              private activatedRoute: ActivatedRoute,
              private storageService: StorageService,
              private fb: FormBuilder
  ) {

    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.idTopic = this._route.snapshot.paramMap.get("idTopic");
    this.idEvaluation = this._route.snapshot.paramMap.get("idEvaluation");
    this.idResource = this._route.snapshot.paramMap.get("idResource");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule]},
      {
        label: 'Recursos y evaluaciones',
        routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule + '/resources/' + this.idTopic]
      },
      {
        label: 'Evaluación',
        routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule + '/resources/' + this.idResource + '/evaluation/' + this.idEvaluation]
      },
    ]);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let questionnaire = this.activatedRoute.snapshot.params;

      console.log(questionnaire); // OUTPUT 123
      if (questionnaire['ideva'] != undefined) {
        this.obtenerPreguntas(questionnaire['ideva']);
      }
    });
    console.log("canvas, ", this.CanvasEl);

  }

  /*ngAfterViewInit(): void {
    // Call the method creating a child component of class 'ComponentA' inside the template
    console.log("ejecutar despues de terminar carga");
    this.startContinuousArtyom();
  }*/

  ngOnDestroy() {
    this.tiempoEvaluacion$.unsubscribe();
  }

  tipoPregunta(typo: number): string {
    let resp: string = "";
    if (typo == 1) {
      resp = "Complete";
    }
    if (typo == 2) {
      resp = "Simple Option";
    }
    if (typo == 3) {
      resp = "Multiple Option";
    }
    if (typo == 4) {
      resp = "Relate";
    }
    return resp;
  }

  tipoPreguntajson(typo: number): string {
    let resp: string = "";
    if (typo == 1) {
      resp = "trueorfalse";
    }
    if (typo == 2) {
      resp = "simpleoption";
    }
    if (typo == 3) {
      resp = "multipleoption";
    }
    if (typo == 4) {
      resp = "complete";
    }
    if (typo == 5) {
      resp = "relate";
    }
    if (typo == 6) {
      resp = "puzzle";
    }
    return resp;
  }

  recuentosAnteriores(categoria: number, indice: number): number {
    let quests: number[] = [
      this.evaluationObject.trueorfalse.length,
      this.evaluationObject.simpleoption.length,
      this.evaluationObject.multipleoption.length,
      this.evaluationObject.complete.length,
      this.evaluationObject.relate.length,
      this.evaluationObject.puzzle.length
    ];
    let total: number = 0;
    //Todas las preguntas
    for (let ind = 0; ind < quests.length; ind++) {
      if (ind < categoria - 1) {
        total += quests[ind];
      }
    }
    return indice + total + 1;
  }

  totalPuntos(): number {
    let quests: QuestionModel[] = [
      ...this.evaluationObject.trueorfalse,
      ...this.evaluationObject.simpleoption,
      ...this.evaluationObject.multipleoption,
      ...this.evaluationObject.complete,
      ...this.evaluationObject.relate,
      ...this.evaluationObject.puzzle
    ];
    let tpuntos: number = 0;
    //Todas las preguntas
    for (let ind = 0; ind < quests.length; ind++) {
      if (quests[ind].points_question) {
        tpuntos += quests[ind].maximumpoints_question;
      }
    }
    // //preguntas de selección simple
    // for (let ind = 0; ind < this.evaluationObject.simpleoption.length; ind++) {
    //   if (this.evaluationObject.simpleoption[ind].points_question) {
    //     tpuntos += this.evaluationObject.simpleoption[ind].maximumpoints_question;
    //   }
    // }
    // // preguntas de selección múltiple
    // for (let ind = 0; ind < this.evaluationObject.multipleoption.length; ind++) {
    //   if (this.evaluationObject.multipleoption[ind].points_question) {
    //     tpuntos += this.evaluationObject.multipleoption[ind].maximumpoints_question;
    //   }
    // }
    // //Preguntas de complete
    // for (let ind = 0; ind < this.evaluationObject.complete.length; ind++) {
    //   if (this.evaluationObject.complete[ind].points_question) {
    //     tpuntos += this.evaluationObject.complete[ind].maximumpoints_question;
    //   }
    // }
    // //Preguntas de relacionar
    // for (let ind = 0; ind < this.evaluationObject.relate.length; ind++) {
    //   if (this.evaluationObject.relate[ind].points_question) {
    //     tpuntos += this.evaluationObject.relate[ind].maximumpoints_question;
    //   }
    // }
    return tpuntos;
  }

  cantidadPreguntas(): number {
    let quests: QuestionModel[] = [
      ...this.evaluationObject.trueorfalse,
      ...this.evaluationObject.simpleoption,
      ...this.evaluationObject.multipleoption,
      ...this.evaluationObject.complete,
      ...this.evaluationObject.relate,
      ...this.evaluationObject.puzzle
    ];
    return quests.length;
  }

  getCountResueltas(): string {
    let quests: QuestionModel[] = [
      ...this.evaluationObject.trueorfalse,
      ...this.evaluationObject.simpleoption,
      ...this.evaluationObject.multipleoption,
      ...this.evaluationObject.complete,
      ...this.evaluationObject.relate,
      ...this.evaluationObject.puzzle
    ];
    let respondidas: number = 0;
    //Todas las preguntas
    for (let ind = 0; ind < quests.length; ind++) {
      if (quests[ind].canResource != undefined) {
        respondidas++;
      }
    }
    // //preguntas de selección simple
    // for (let ind = 0; ind < this.evaluationObject.simpleoption.length; ind++) {
    //   if (this.evaluationObject.simpleoption[ind].canResource != undefined) {
    //     respondidas++;
    //   }
    // }
    // // preguntas de selección múltiple
    // for (let ind = 0; ind < this.evaluationObject.multipleoption.length; ind++) {
    //   if (this.evaluationObject.multipleoption[ind].canResource != undefined) {
    //     respondidas++;
    //   }
    // }
    // //Preguntas de complete
    // for (let ind = 0; ind < this.evaluationObject.complete.length; ind++) {
    //   if (this.evaluationObject.complete[ind].canResource != undefined) {
    //     respondidas++;
    //   }
    // }
    // //Preguntas de relacionar
    // for (let ind = 0; ind < this.evaluationObject.relate.length; ind++) {
    //   if (this.evaluationObject.relate[ind].canResource != undefined) {
    //     respondidas++;
    //   }
    // }
    return respondidas + " / " + quests.length;
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
      resp = "Extremo";
    }
    return resp;
  }

  obtenerPreguntas(idEvaluacion: number): void {
    //let idEvaluacion: number = 1;
    //codigo para extraer de la url o veran donde
    this.obtenerPreguntasWS(idEvaluacion).subscribe(response => {
      console.log("obtenerPreguntasWS: ", response);
      if (response.status == 2) {
        if (response.data.length > 0) {
          this.evaluationObject = response.data[0];

          if (this.evaluationObject.time_evaluation) {
            this.tiempoEvaluacion = this.evaluationObject.timeminutes_evaluation * 60;
            this.tiempoEvaluacion$ = timer(0, 1000)
              .subscribe((iter: any) => {
                //this.time();
                // console.log("tiempoEvaluacion: " + iter);
                if (this.tiempoEvaluacion <= 0) {
                  this.tiempoEvaluacion$.unsubscribe();
                  /*Código para indicar que se terminó el tiempo*/
                }
                this.tiempoEvaluacion--;
              });
            if (this.voiceComandsSupport()) {
              if (this.storageService.getCurrentUser().email != "anthony.pachay2017@uteq.edu.ec") {
                this.startContinuousArtyom();
              }
            }
            this.cambiarPregunta(2, 0, true);
          }
          //this.initCanvas(false);
          setTimeout(() => {
            console.log("silenciar video")
            this.autoClick("#silenciar_video");
          }, 500);
        }
      }
    });

  }

  partirPreguntaComplete(quest: string): string[] {
    return quest.split(/[\{\}]/);
  }

  miliseguntos2Segundos(tiempo: number): string {
    let m = Math.floor(tiempo % 3600 / 60).toString().padStart(2, '0');
    let s = Math.floor(tiempo % 60).toString().padStart(2, '0');
    return m + ":" + s;
  }

  cambiarPregunta(typeQuestion: number, indice: number, flag: boolean = false): void {
    console.log("cambia a pregunta:" + typeQuestion + " : " + indice);
    // if (indice != this.indexQuestionObject) {
    this.indexQuestionObject = indice;
    let typeQuest = this.tipoPreguntajson(typeQuestion);
    // @ts-ignore
    this.questionObject = this.evaluationObject[typeQuest][this.indexQuestionObject];
    console.log(typeQuest + " :cambia a pregunta:" + this.questionObject);
    // @ts-ignore
    let rec: string = this.questionObject.answers_[0].options_answer[0].resource!;
    rec = rec != undefined ? rec : "";
    this.questionObject.canResource = (rec.length > 0);
    console.log("pregunta: ", this.questionObject);
    // }
    this.initCanvas(flag);
    if (this.storageService.getCurrentUser().email != "anthony.pachay2017@uteq.edu.ec") {
      this.leerPregunta();
    }
  }


  obtenerPreguntasWS(idEvaluacion: number): Observable<EvaluationQuestionsResponse> {
    let urlServicio: string;
    urlServicio = this.utils.globalUrl;
    console.log("servicio: ", urlServicio);
    urlServicio += "evaluation/getEvaluationQuestions";
    /*if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      urlServicio = "virtusbk/evaluation/getEvaluationQuestions";
    } else {
      urlServicio = "virtus_bk/evaluation/getEvaluationQuestions";
    }*/

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

  obtenerIndicesPreguntas(indice: number): number {
    let quests: number[] = [
      this.evaluationObject.simpleoption.length,
      this.evaluationObject.multipleoption.length,
      this.evaluationObject.complete.length,
      this.evaluationObject.relate.length
    ];
    let typoQuest: number = 0;
    //Todas las preguntas
    if (indice < 0) {
      indice = 0;
    }
    for (let ind = 0; quests.length; ind++) {
      if (indice < quests[ind]) {
        typoQuest = (ind + 1);
      }
      indice = indice - quests[ind];
    }
    return indice;
  }

  /*Paginar preguntas*/
  anteriorPregunta(): void {
    let ind = this.indexQuestionObject + 1;
    // if (ind >= this.evaluationObject.questions_.length) {
    //   ind = this.evaluationObject.questions_.length - 1;
    // }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    console.log("cambiarPregunta()", ind);
    this.obtenerIndicesPreguntas(ind);
  }

  siguientePregunta(): void {
    console.log("siguiente pregunta");
    let ind = this.indexQuestionObject - 1;
    if (ind < 0) {
      ind = 0;
    }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    this.obtenerIndicesPreguntas(ind);
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
      let actual: boolean = (this.btnVideoControl as HTMLFormElement)['muted'];
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

      if (this.questionObject.name_questioncategory == this.tipoPregunta(2)) {
        if (this.questionObject.canResource) {
          this.autoClick("#option_rd_2_" + wildcard.trim());
        } else {
          this.autoClick("#option_rd_" + wildcard.trim());
        }
      } else if (this.questionObject.name_questioncategory == this.tipoPregunta(3)) {
        if (this.questionObject.canResource) {
          this.autoClick("#option_ck_2_" + wildcard.trim());
        } else {
          this.autoClick("#option_ck_" + wildcard.trim());
        }
      }
    } else {
      //this.artyom.say("No se encuentra ese literal");
      console.log("No se encuentra ese literal")
    }
  }

  evaluar_control_video(wildcard: string, i: number, database: string[]): void {
    console.log("wilcardOriginal:" + wildcard);
    wildcard = wildcard.trim().replace(/[^a-zA-Z]+/, "");
    console.log("wildcard:", wildcard, i, database.indexOf(wildcard.trim()));
    if (database.indexOf(wildcard.trim()) > -1) {
      //this.artyom.say("Ha indicado la selección del literal " + wildcard);
      console.log("Ha indicado la selección del literal " + wildcard);
      console.log("#video_" + wildcard.trim() + ": => click")
      this.autoClick("#video_" + wildcard.trim());
    } else {
      console.log("No se encuentra ese literal")
    }
  }

  /*Comandos de voz*/

  voiceComandsSupport(): boolean {
    let microphoneApi: boolean = window.hasOwnProperty('webkitSpeechRecognition') && window.hasOwnProperty('speechSynthesis');
    return microphoneApi;
  }

  startContinuousArtyom(): void {

    this.artyom.fatality();
    let local_this = this;
    let myGroup: any = [{
      description: "Si el usuario indica un literal que se encuentra en la lista",
      smart: true, // Activar comando como un comando smart para poder usar comodines
      indexes: ["literal *", "opción *"],
      action: function (i: number, wildcard: string) {
        //let database: string[] = ["a", "b", "c", "d", "e", "f"];
        local_this.evaluar(wildcard, i);

      }
    },
      {
        description: "controles de video",
        smart: true, // Activar comando como un comando smart para poder usar comodines
        indexes: ["video *"],
        action: function (i: number, wildcard: string) {
          let database: string[] = ["reproducir", "pausar", "silenciar"];
          //reproducir_video
          //pausar_video
          //silenciar_video
          local_this.evaluar_control_video(wildcard, i, database);
          /*console.log("wilcardOriginal:" + wildcard);
          wildcard = wildcard.trim().replace(/[^a-zA-Z]+/, "");
          console.log("wildcard:", wildcard, i, database.indexOf(wildcard.trim()));
          if (database.indexOf(wildcard.trim()) > -1) {
            //this.artyom.say("Ha indicado la selección del literal " + wildcard);
            console.log("Ha indicado la selección del literal " + wildcard);
            console.log("#video_" + wildcard.trim() + ": => click")
            // this.autoClick("#video_" + wildcard.trim());
            let btnStart = document.querySelector("#video_" + wildcard.trim());
            if (btnStart) (btnStart as HTMLFormElement).click();
          } else {
            console.log("No se encuentra ese literal")
          }*/
        }
      }
    ];

    this.artyom.addCommands(myGroup);


    //setTimeout(() => {
    //this.probarcomando();
    //let btnStart = document.querySelector("#btnStart");
    //if (btnStart) (btnStart as HTMLFormElement).click();
    //this.autoClick("#btnStart");

    //}, 5000);

    this.artyom.initialize({
      lang: "es-ES",
      continuous: true, // Artyom will listen foreversilenciar
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
    if (this.questionObject.name_questioncategory == "Simple Option"
      || this.questionObject.name_questioncategory == "Multiple Option") {
      for (let i = 0; i < this.questionObject.answers_[0].options_answer.length; i++) {
        reader += "literal " + this.alphabet[i] + " \n";
        let element = this.questionObject.answers_[0].options_answer[i];
        // @ts-ignore
        reader += element?.option + " \n";
      }
    }

    //console.log(reader);
    this.artyom.say(reader);
  }

  /*Operaciones en canvas*/

  public onoff: boolean;
  public lastLoc = {x: 0, y: 0};

  initCanvas(nuevo: boolean): void {
    console.log("canvas Element ", this.CanvasEl);
    console.log(this.CanvasEl.nativeElement);
    let mecanvas = this.CanvasEl.nativeElement;
    //this.contex = (this.CanvasEl.nativeElement as HTMLCanvasElement).getContext("2d");
    //this.contex = this.CanvasEl.nativeElement.getContext('2d');
    mecanvas.style['cursor'] = 'pointer';
    let cantidad: number = this.questionObject.answers_[0].options_answer.length;
    mecanvas.width = (75 * cantidad);
    mecanvas.getContext('2d')!.clearRect(0, 0, mecanvas.width, mecanvas.height);

    for (let ind = 0; ind < cantidad; ind++) {
      let img = new Image();
      img.onload = function () {
        img.width = 10;
        let ctx = mecanvas.getContext('2d')!;
        ctx.drawImage(img, (ind * 75), 0, 75, 75);
      };
      img.src = 'assets/imgresource/alfabeto/' + this.alphabet[ind] + '.png';
    }
    if (nuevo) {
      mecanvas.onmousedown = (e: {
        pageX: any; pageY: any; clientX: number; clientY: number;
      }) => {
        this.onoff = true;
        this.lastLoc = this.windowCanvas(e.clientX, e.clientY);
      };
      mecanvas.onmousemove = (e: any) => {

        if (this.onoff) {
          let ctx = mecanvas.getContext('2d')!;
          var curLoc = this.windowCanvas(e.clientX, e.clientY);
          ctx.beginPath();
          ctx.moveTo(this.lastLoc.x, this.lastLoc.y);
          ctx.lineTo(curLoc.x, curLoc.y);
          ctx.strokeStyle = "#00a186";
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.stroke();
          this.lastLoc = curLoc;
        }
        //console.log("... Move onmousemove");
      }

      // The mouse click , Release , Move , Leave event execution
      mecanvas.onmouseup = (e: {
        preventDefault: () => void; pageX: any; pageY: any;
      }) => {
        this.onoff = false;
        let indice = Math.trunc((this.lastLoc.x) / 75);
        console.log(this.lastLoc.x, indice);
        let wildcard: string = this.alphabet[indice];
        if (this.questionObject.name_questioncategory == this.tipoPregunta(2)) {
          if (this.questionObject.canResource) {
            this.autoClick("#option_rd_2_" + wildcard.trim());
          } else {
            this.autoClick("#option_rd_" + wildcard.trim());
          }
        } else if (this.questionObject.name_questioncategory == this.tipoPregunta(3)) {
          if (this.questionObject.canResource) {
            this.autoClick("#option_ck_2_" + wildcard.trim());
          } else {
            this.autoClick("#option_ck_" + wildcard.trim());
          }
        }
      }
      mecanvas.onmouseout = (e: {
        preventDefault: () => void;
      }) => {

        this.onoff = false;
      };
    }
  }

  /** *  obtain canvas coordinate  */
  windowCanvas(x: number, y: number) {
    let mecanvas = this.CanvasEl.nativeElement;
    var ctxbox = mecanvas.getBoundingClientRect();
    //console.log('canvas coordinate ', Math.round(x - ctxbox.left), Math.round(y - ctxbox.top));
    return {
      x: Math.round(x - ctxbox.left), y: Math.round(y - ctxbox.top)
    };
  }

}
