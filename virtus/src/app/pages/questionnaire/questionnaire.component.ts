import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, timer} from 'rxjs';
import {Person} from "../../models/Person";
import {Utils} from "../../util/Utils";
import {ActivatedRoute} from '@angular/router';

import {
  Evaluation,
  EvaluationQuestionsResponse,
  Options,
  OptionsAnswer,
  Questions
} from "../../models/evaluation_questionarie";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppMainComponent} from '../../app.main.component';
import {StorageService} from "../../authentication/StorageService";
import {FormBuilder} from '@angular/forms';
import {utils} from "protractor";


declare var Artyom: any;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  idCourse: string | null = "";
  idModule: string | null = "";
  idTopic: string | null = "";
  idEvaluation: string | null = "";
  idResource: string | null = "";
  //valRadio: string;
  public vistaVideoSenias: boolean = true;
  viewQuestionBank: boolean = true;

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
  public tiempoEvaluacion$: Subscription | any;
  public tiempoEvaluacion: number = 0;

  public literalSeleccionado: any;

  valueProgress = 0;

  public sweetFakeAlert: boolean[] = [false, true];

  @ViewChild('canvasEl', {static: true}) CanvasEl: ElementRef<HTMLCanvasElement>;
  private contex: CanvasRenderingContext2D | null;


  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private _route: ActivatedRoute,
              private utils: Utils,
              private activatedRoute: ActivatedRoute,
              private storageService: StorageService,
              private fb: FormBuilder,
              private changeDetector: ChangeDetectorRef
  ) {

    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.idTopic = this._route.snapshot.paramMap.get("idTopic");
    this.idEvaluation = this._route.snapshot.paramMap.get("idEvaluation");
    this.idResource = this._route.snapshot.paramMap.get("idResource");
    this.breadcrumbService.setItems([
      {
        label: '',
        routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule + '/resources/' + this.idTopic]
      },
      {label: 'Cursos', routerLink: ['/app']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule]},
      {
        label: 'Recursos y evaluaciones',
        routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule + '/resources/' + this.idTopic]
      },
      {
        label: 'Cuestionario',
        routerLink: ['/app/mycourse/modules/' + this.idCourse + '/themes/' + this.idModule + '/resources/' + this.idResource + '/questionnaire/' + this.idEvaluation]
      },
    ]);


    // this.breadcrumbService.setItems([
    //   {label: 'Cuestionario', routerLink: ['/app/questionnaire']}
    // ]);
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

  openClose() {
    this.viewQuestionBank = !this.viewQuestionBank;
  }

  ngAfterViewInit(): void {
    //this.showSwal(true);
    //this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    if (this.tiempoEvaluacion$ !== undefined) {
      this.tiempoEvaluacion$.unsubscribe();
    }
    if (this.text2SpeakSupport() && this.artyom.isSpeaking()) {
      this.artyom.shutUp();
    }
    //Quitar el reconocimiento de voz
    if (this.voiceComandsSupport()) {
      this.artyom.fatality().then(() => {
        this.artyom.clearGarbageCollection();
      });
    }
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
      resp = "puzzle";
    }
    return resp;
  }

  totalPuntos(): number {
    let tpuntos: number = 0;
    for (let ind = 0; ind < this.evaluationObject.questions_.length; ind++) {
      if (this.evaluationObject.questions_[ind].points_question) {
        tpuntos += this.evaluationObject.questions_[ind].maximumpoints_question;
      }
    }
    return tpuntos;
  }

  getCountResueltas(): string {
    let total = this.evaluationObject.questions_.length;
    let respondidas = 0;
    for (let ind = 0; ind < total; ind++) {
      if (this.evaluationObject.questions_[ind].canResource != undefined) {
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

  obtenerPreguntas(idEvaluacion: number): void {
    //let idEvaluacion: number = 1;
    //codigo para extraer de la url o veran donde
    this.obtenerPreguntasWS(idEvaluacion).subscribe(response => {
      console.log("obtenerPreguntasWS: ", response);
      if (response.status == 2) {
        if (response.data.length > 0) {
          this.evaluationObject = response.data[0];

          //if (this.evaluationObject.time_evaluation) {
            this.tiempoEvaluacion = 0;//60 * 60;//this.evaluationObject.timeminutes_evaluation * 60;
            this.tiempoEvaluacion$ = timer(0, 1000)
              .subscribe((iter: any) => {
                //console.log("tiempoEvaluacion: " + iter);
                //if (this.tiempoEvaluacion >= 60 * 60) {
                  //this.tiempoEvaluacion$.unsubscribe();
                  /*Código para indicar que se terminó el tiempo*/
                //}
                this.tiempoEvaluacion++;
              });
          //}
          if (this.voiceComandsSupport()) {
            if (this.storageService.getCurrentUser().email != "anthony.pachay2017@uteq.edu.ec") {
              this.startContinuousArtyom();
            }
          }
          if (this.storageService.getCurrentUser().email == "anthony.pachay2017@uteq.edu.ec") {
            this.cambiarPregunta(13, true);
          }else {
            this.cambiarPregunta(0, true);
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


  verificarRespuestasCorrectas(questionItem: Questions): boolean {
    if (questionItem.answers_[0].responses != undefined)
      //verdadero o falso O unica seleccion
      if (questionItem.name_questioncategory == this.tipoPregunta(2)
        || questionItem.name_questioncategory == this.tipoPregunta(1)) {
        // @ts-ignore
        return questionItem.answers_[0].responses.correct == "Yes";
      } else if (questionItem.name_questioncategory == this.tipoPregunta(1)) {
        let flagAlltrue: boolean = true;
        let indT = 0;
        let indTS = 0;
        for (let ind = 0; ind < questionItem.answers_[0].responses.length; ind++) {
          if (questionItem.answers_[0].responses[ind].correct == "Yes") {
            indTS++;
          } else {
            flagAlltrue = false;
          }
        }
        for (let ind = 0; ind < questionItem.answers_[0].options_answer.length; ind++) {
          if (questionItem.answers_[0].options_answer[ind].correct == "Yes") {
            indT++;
          }
        }
        return flagAlltrue && indTS == indT;
      } else {
      }
    return false;
  }

  validarPreguntaResuelta(questionItem: Questions): boolean {
    if (questionItem.answers_[0].responses != undefined)
      return (questionItem.answers_[0].responses.length > 0
        || Object.keys(questionItem.answers_[0].responses).length > 0);
    return false;
  }

  validarPreguntaRecurso(elemt: string): boolean {
    if (elemt != undefined && elemt != null)
      return (elemt.length > 0);
    return false;
  }


  partirPreguntaComplete(quest: string): string[] {
    return quest.split(/[\{\}]/);
  }

  miliseguntos2Segundos(tiempo: number): string {
    let h = Math.floor(tiempo / 3600).toString().padStart(2, '0');
    let m = Math.floor(tiempo % 3600 / 60).toString().padStart(2, '0');
    let s = Math.floor(tiempo % 60).toString().padStart(2, '0');
    if (h == '00') {
      return m + ":" + s;
    } else {
      return h + ":" + m + ":" + s;
    }
  }

  cambiarPregunta(indice: number, flag = false): void {
    console.log("cambia a pregunta:" + indice);
    console.log(this.questionObject != undefined && this.questionObject != null);
    if (this.questionObject != null && this.questionObject != undefined) {
      console.log(this.validarPreguntaResuelta(this.questionObject));
      if (this.validarPreguntaResuelta(this.questionObject)) {
        //La preguntaha sido contestada
        //validar las respuestas que he dado
        console.log("FeedBack: ", this.questionObject.feedback_question);
        //this.utils.showMessages(1, "FeedBack: " + this.questionObject.feedback_question);
        let flagCorrect = this.verificarRespuestasCorrectas(this.questionObject);
        this.showSwal(flagCorrect);
        if (!flagCorrect) {
          return;
        } else {
          if (this.valueProgress < 100) {
            this.valueProgress = this.valueProgress + ((100) / this.evaluationObject.questions_.length);
          }
        }
      } else {
        console.log("Primero debes responder la pregunta");
        this.utils.showMessages(3, "Primero debes responder la pregunta");
        return;
      }
    }
    if (indice != this.indexQuestionObject) {
      this.indexQuestionObject = indice;
      this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
      console.log("cambia a pregunta:" + this.questionObject);
      let rec: string = this.questionObject.answers_[0].options_answer[0].resource!;
      rec = rec != undefined ? rec : "";
      this.questionObject.canResource = (rec.length > 0);
      if (this.questionObject.name_questioncategory == this.tipoPregunta(4)) {
        for (let i = 0; i < this.questionObject.answers_[0].options_answer.length; i++) {
          this.questionObject.answers_[0].complete_parts = this.partirPreguntaComplete(this.questionObject.answers_[0].options_answer[i].description_question);
        }
        this.questionObject.answers_[0].responses = Array<OptionsAnswer>(this.questionObject.answers_[0].complete_parts!.length - 1);
      }
      if (this.questionObject.name_questioncategory == this.tipoPregunta(5)) {
        this.questionObject.answers_[0].right_parts = [...this.questionObject.answers_[0].options_answer];
        console.log("tipo pregujnta 5" , this.questionObject.answers_[0].right_parts);
        this.questionObject.answers_[0].responses = Array<OptionsAnswer>(this.questionObject.answers_[0].options_answer.length - 1);
      }
      console.log("pregunta: ", this.questionObject);
    }
    this.initCanvas(flag);
    // el browser es comantible con el speaker?
    if (this.text2SpeakSupport()) {
      if (this.storageService.getCurrentUser().email != "anthony.pachay2017@uteq.edu.ec") {
        this.leerPregunta();
      }
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

  showSwal(correcta: boolean): void {
    this.sweetFakeAlert[0] = true;
    this.sweetFakeAlert[1] = correcta;
    let tiempoSwal$ = timer(0, 1000)
      .subscribe((iter: any) => {
        if (iter >= 10) {
          tiempoSwal$.unsubscribe();
          this.sweetFakeAlert[0] = false;
        }
      });
  }


  /*Paginar preguntas*/
  anteriorPregunta(): void {

    let ind = this.indexQuestionObject + 1;
    if (ind >= this.evaluationObject.questions_.length) {
      ind = this.evaluationObject.questions_.length - 1;
    }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    console.log("cambiarPregunta()", ind);
    this.cambiarPregunta(ind);
  }

  siguientePregunta(): void {
    console.log("siguiente pregunta");
    let ind = this.indexQuestionObject - 1;
    if (ind < 0) {
      ind = 0;
    }
    //this.questionObject = this.evaluationObject.questions_[this.indexQuestionObject];
    this.cambiarPregunta(ind);
  }

  /*Video Player*/

  public btnVideoControl: any;
  public btnVideoSignControl: any;

  initVideoControls(): void {
    this.btnVideoControl = document.querySelector("#pathurlvideo_question");
  }

  initVideoSignControls(): void {
    this.btnVideoSignControl = document.querySelector("#pathurlsign_question");
  }

  playSignVideo() {
    this.initVideoSignControls()
    if (this.btnVideoSignControl) (this.btnVideoSignControl as HTMLFormElement)['play']();
  }

  pauseSignVideo() {
    this.initVideoSignControls();
    if (this.btnVideoSignControl) (this.btnVideoSignControl as HTMLFormElement)['pause']();
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

      if (this.questionObject.name_questioncategory == this.tipoPregunta(1)) {
        if (this.questionObject.canResource) {
          this.autoClick("#option_vf_" + wildcard.trim());
        } else {
          this.autoClick("#option_vf_" + wildcard.trim());
        }
      } else if (this.questionObject.name_questioncategory == this.tipoPregunta(2)) {
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

  evaluar_control_evaluacion(wildcard: string, i: number, database: string[]): void {
    console.log("wilcardOriginal:" + wildcard);
    wildcard = wildcard.trim().replace(/[^a-zA-Z]+/, "");
    console.log("wildcard:", wildcard, i, database.indexOf(wildcard.trim()));
    if (database.indexOf(wildcard.trim()) > -1) {
      //this.artyom.say("Ha indicado la selección del literal " + wildcard);
      console.log("Ha indicado la selección del literal " + wildcard);
      console.log("#video_" + wildcard.trim() + ": => click")
      this.autoClick("#evt_control_" + wildcard.trim());
    } else {
      console.log("No se encuentra ese literal")
    }
  }

  /*Comandos de voz*/

  voiceComandsSupport(): boolean {
    //let microphoneApi: boolean = window.hasOwnProperty('webkitSpeechRecognition') && window.hasOwnProperty('speechSynthesis');
    let microphoneApi: boolean = this.artyom.recognizingSupported();
    return microphoneApi;
  }

  text2SpeakSupport(): boolean {
    let microphoneApi: boolean = this.artyom.speechSupported();
    return microphoneApi;
  }

  isDesktopDevice(): boolean {
    return this.artyom.Device.isMobile();
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
        console.log("literal_wilcardOriginal:" + wildcard);
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

          /*wildcard = wildcard.trim().replace(/[^a-zA-Z]+/, "");
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
      }, {
        description: "controles del contexto evaluativo",
        smart: true, // Activar comando como un comando smart para poder usar comodines
        indexes: ["comando *"],
        action: function (i: number, wildcard: string) {
          let database: string[] = ["siguiente", "anterior", "enviar"];
          local_this.evaluar_control_evaluacion(wildcard, i, database);
        }
      }
    ];

    this.artyom.addCommands(myGroup);


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

  cancelarEscuchaComandosVoz():void{
    if(this.artyom.isObeying()){
      this.artyom.dontObey();
    } else{
      this.artyom.obey();
    }
  }

  leerPregunta(): void {
    let reader: string = "";
    reader += this.questionObject.description_question + " \n";
    for (let i = 0; i < this.questionObject.answers_[0].options_answer.length; i++) {
      reader += "literal " + this.alphabet[i] + " \n";
      reader += this.questionObject.answers_[0].options_answer[i].opcion + " \n";
    }
    //si están hablando, callarlos
    if (this.artyom.isSpeaking()) {
      this.artyom.shutUp();
    }

    //Desactivar el reconocimiento de comandos cuando empiece la lectura
    this.artyom.dontObey();
    let local_artyom = this.artyom;
    this.artyom.say(reader, {
      onStart: function () {
      },
      onEnd: function () {
        //activar el reconocimiento de los comandos
        local_artyom.obey();
        console.log("vuelve a hablar");
      }
    });
  }

  /*Operaciones en canvas*/

  public onoff: boolean;
  public firstLoc = {x: 0, y: 0};
  public lastLoc = {x: 0, y: 0};

  initCanvas(nuevo: boolean): void {
    console.log("canvas Element ", this.CanvasEl);
    console.log(this.CanvasEl.nativeElement);
    let mecanvas = this.CanvasEl.nativeElement;
    //this.contex = (this.CanvasEl.nativeElement as HTMLCanvasElement).getContext("2d");
    //this.contex = this.CanvasEl.nativeElement.getContext('2d');
    mecanvas.style['cursor'] = 'pointer';


    let c_tamanio = 85, c_margen = 10;
     if (this.questionObject.name_questioncategory == this.tipoPregunta(4)) {
      let parts_p_tmp: string[] = this.questionObject.answers_[0].complete_parts!;
      let parts_p: string[] = [];
      for (let ind = 0; ind < parts_p_tmp.length; ind++) {
        if (parts_p_tmp[ind] == "$option$") {
          parts_p.push(parts_p_tmp[ind]);
        }
      }
      let parts_o: Options[] = this.questionObject.answers_[0].options_answer[0].options!;
      let cantidad: number = parts_p.length > parts_o.length ? parts_p.length : parts_o.length;
      mecanvas.height = (c_tamanio * cantidad) + (c_margen * (cantidad - 1));
      mecanvas.width = (c_tamanio * 2) + 150;
      mecanvas.getContext('2d')!.clearRect(0, 0, mecanvas.width, mecanvas.height);
      let ctx = mecanvas.getContext('2d')!;
      let colorPan = ["#E3FFFF", "#BFFFC4", "#F6FFA1", "#C5AEFE", "#FDBDB1", "#BEACFF", "#E9CEBB", "#EFA0E7"];

      this.dibujaFilaItemsCanvas(ctx, c_tamanio, c_margen, cantidad, this.alphabet.slice(0, parts_p.length)
        , true, "-");
      this.dibujaFilaItemsCanvas(ctx, c_tamanio, c_margen, cantidad, parts_o
        , false, "option");
    }else if (this.questionObject.name_questioncategory == this.tipoPregunta(5)) {
       let parts_o: OptionsAnswer[] = this.questionObject.answers_[0].options_answer;
       let cantidad: number = parts_o.length;
       mecanvas.height = (c_tamanio * cantidad) + (c_margen * (cantidad - 1));
       mecanvas.width = (c_tamanio * 2) + 150;
       mecanvas.getContext('2d')!.clearRect(0, 0, mecanvas.width, mecanvas.height);
       let ctx = mecanvas.getContext('2d')!;
       let colorPan = ["#E3FFFF", "#BFFFC4", "#F6FFA1", "#C5AEFE", "#FDBDB1", "#BEACFF", "#E9CEBB", "#EFA0E7"];

       this.dibujaFilaItemsCanvas(ctx, c_tamanio, c_margen, cantidad, parts_o
         , true, "leftSide");
       this.dibujaFilaItemsCanvas(ctx, c_tamanio, c_margen, cantidad, parts_o
         , false, "rightSide");
     }
     else {
      let cantidad: number = this.questionObject.answers_[0].options_answer.length;
      mecanvas.width = (c_tamanio * cantidad) + (c_margen * (cantidad - 1));
      mecanvas.getContext('2d')!.clearRect(0, 0, mecanvas.width, mecanvas.height);
      for (let ind = 0; ind < cantidad; ind++) {
        let img = new Image();
        img.onload = function () {
          img.width = 10;
          let ctx = mecanvas.getContext('2d')!;
          ctx.drawImage(img, (ind * c_tamanio) + (c_margen * ind), 5, c_tamanio, c_tamanio);
        };
        img.src = 'assets/imgresource/alfabeto/propio/' + this.alphabet[ind] + '.png';
      }
    }
    if (nuevo) {
      mecanvas.onmousedown = (e: {
        pageX: any; pageY: any; clientX: number; clientY: number;
      }) => {
        this.onoff = true;
        this.lastLoc = this.windowCanvas(e.clientX, e.clientY);
        this.firstLoc = this.windowCanvas(e.clientX, e.clientY);
        this.initCanvas(false);
      };
      mecanvas.onmousemove = (e: any) => {

        if (this.onoff) {
          let ctx = mecanvas.getContext('2d')!;
          var curLoc = this.windowCanvas(e.clientX, e.clientY);
          ctx.beginPath();
          ctx.moveTo(this.lastLoc.x, this.lastLoc.y);
          ctx.lineTo(curLoc.x, curLoc.y);
          ctx.strokeStyle = "rgba(0,0,0,0.25)";
          ctx.lineWidth = 10;
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
        let indice = Math.trunc((this.lastLoc.x) / 90);
        console.log(this.lastLoc.x, indice);
        let wildcard: string = this.alphabet[indice];
        if (this.questionObject.name_questioncategory == this.tipoPregunta(1)) {
          this.autoClick("#option_vf_" + wildcard.trim());
        } else if (this.questionObject.name_questioncategory == this.tipoPregunta(2)) {
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
        } else if (this.questionObject.name_questioncategory == this.tipoPregunta(4)) {
          let mayor:number = Math.max(this.questionObject.answers_[0].options_answer[0].options!.length,
                    this.questionObject.answers_[0].complete_parts!.length);
          let origen = -1, destino = -1;
          let saltosBaseOp = (((mayor / this.questionObject.answers_[0].options_answer[0].options!.length)) / 2 );
          saltosBaseOp = (mayor == this.questionObject.answers_[0].options_answer[0].options!.length)? 0 : saltosBaseOp;
          let saltosBasePr = (((mayor / this.questionObject.answers_[0].complete_parts!.length)) / 2 );
          saltosBasePr = (mayor == this.questionObject.answers_[0].complete_parts!.length)? 0 : saltosBasePr;
          let c_alto = 85;

          if(this.firstLoc.x < c_alto && this.lastLoc.x > c_alto + 150){
            origen = 1;
            console.log("izquierda a derecha ");
            if(this.questionObject.answers_[0].options_answer[0].options!.length != mayor){
              saltosBaseOp = 0;
            }else{
              saltosBasePr = 0;
            }
            //((saltosBaseOp * c_tamanio) + (ssaltosBaseOp * c_margen))
            console.log("Indices seleccionados",
              Math.trunc((this.firstLoc.y) / c_alto - ((saltosBasePr * c_tamanio) + (saltosBasePr * c_margen)) / c_alto ),
              Math.trunc((this.lastLoc.y) / c_alto - ((saltosBaseOp * c_tamanio) + (saltosBaseOp * c_margen)) / c_alto));
          } else if(this.lastLoc.x < 90 && this.firstLoc.x > c_alto + 150){
            destino = 1;
            console.log("derecha a izquierda= " + "("+ this.firstLoc.y + ") / " + c_alto  + " - " + saltosBasePr);
            console.log("Indices seleccionados", Math.trunc((this.firstLoc.y) / c_alto - saltosBasePr),
              Math.trunc((this.lastLoc.y) / c_alto - saltosBaseOp));
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

  //this.alphabet.subarray(parts.length);
  dibujaFilaItemsCanvas(ctx: CanvasRenderingContext2D, c_tamanio: number, c_margen: number, maxElements: number
    , parts: any[], isleft: boolean, subProperty: string, subPropertyImg:  string = "-"): void {
    let colorPan = ["#E3FFFF", "#BFFFC4", "#F6FFA1", "#C5AEFE", "#FDBDB1", "#BEACFF", "#E9CEBB", "#EFA0E7"];
    //console.log("cantidades", maxElements, parts.length, (maxElements / parts.length));
    let saltosBase = (((maxElements / parts.length)) / 2 );
    saltosBase = (maxElements == parts.length)? 0 : saltosBase;
    //console.log("salto base:" + saltosBase);
    for (let ind = 0; ind < parts.length; ind++) {
      if (isleft) {
        ctx.fillStyle = colorPan[ind >= colorPan.length ? Math.trunc(ind / colorPan.length) : ind];
      } else {
        ctx.fillStyle = colorPan[colorPan.length - 1 - ind < 0 ? 0 : colorPan.length - ind - 1];
      }
      let tmp_y = 0;
      // if (ind == 0) {
      //   tmp_y = (maxElements / parts.length) + Math.trunc((c_tamanio / 2) + 7);
      // } else {
      tmp_y = ((saltosBase + ind) * c_tamanio) + ((saltosBase + ind) * c_margen);
      //console.log("cantidades", "((" + maxElements + " / " + parts.length + ") /" + 2 + " + " + ind + "- 0.5)", "= " + ((maxElements / parts.length) / 2 + ind - 0.5));
      // }
      ctx.fillRect(isleft ? Math.trunc(c_margen / 2) : (c_tamanio + 150), tmp_y, c_tamanio, c_tamanio);
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.font = "15px Arial";
      ctx.fillText(subProperty === "-" ? ("Literal " + parts[ind] + ".") : parts[ind][subProperty],
        isleft ? (Math.trunc(c_margen / 2) + 7) : (c_tamanio + 150) + Math.trunc(c_margen / 2), tmp_y + Math.trunc((c_tamanio / 2) + 7));
      ctx.stroke();

      /*let imgTamanio = c_tamanio * 0.75;
      let img = new Image();
      img.onload = function () {
        img.width = 10;
        ctx.drawImage(img, (ind * c_tamanio) + (c_margen * ind), 5, c_tamanio * 0.75, c_tamanio);
      };
      img.src = 'assets/imgresource/alfabeto/propio/' + this.alphabet[ind] + '.png';*/

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
