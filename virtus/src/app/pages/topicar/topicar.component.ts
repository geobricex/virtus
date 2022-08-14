import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Utils} from "../../util/Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Modules} from "../../models/Modules";
import {Topic} from "../../models/Topic";


@Component({
  selector: 'app-topicar',
  templateUrl: './topicar.component.html',
  styleUrls: ['./topicar.component.scss']
})
export class TopicarComponent implements OnInit {

  newTopicDialog: boolean;
  sortOrder: number;
  sortField: string;
  idCourse: string | null = "";
  idModule: string | null = "";
  globalUri: string = "";
  topic: Topic;
  topics: Topic[];
  urlimageupload: any;
  tmpFile: any;

  registerFormTopic: FormGroup;
  topicSuccessful = false;

  frmPhoto = new FormGroup({
    firstName: new FormControl()
  });

  constructor(
    private breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    private utils: Utils,
    private _http: HttpClient,
    private formBuilder: FormBuilder) {
    this.idCourse = this._route.snapshot.paramMap.get("idcourse");
    this.idModule = this._route.snapshot.paramMap.get("idmodule");
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app/coursear']},
      {label: 'Modulos', routerLink: ['/app/coursear/modulear/' + this.idCourse]},
      {label: 'Temas', routerLink: ['/app/coursear/modulear/' + this.idCourse + '/topicar/' + this.idModule]}
    ]);
  }

  ngOnInit(): void {
    this.loadTopics();
    this.registerFormTopic = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        keywords: ["", Validators.required]
      }
    );
  }

  saveTopic() {
    this.topicSuccessful = true;

    if (this.registerFormTopic.invalid) {
      return;
    }

    console.log(this.form['name'].value);
    console.log(this.form['description'].value);
    console.log(this.form['keywords'].value);

    let urlPhoto: string = "";
    this.utils.changeImage(this.tmpFile).then(response => {
      urlPhoto = this.utils.makePathRecurso(response);
      this.topic = new Topic(0,
        this.form['name'].value,
        this.form['description'].value,
        this.form['keywords'].value,
        urlPhoto, "", "", "");
      let moduleAux = new Modules(
        parseInt(this.idModule === null ? "0" : this.idModule),
        "", "", "",
        "", "", "", ""
      )
      this.topic._syllabuIdSyllabu = moduleAux;
      this.apiSaveTopic(this.topic).subscribe(response => {
        this.utils.showMessages(response.status, response.information, "tst");
        this.resetTopic();
        this.loadTopics();
      });
    });
  }

  apiSaveTopic(topic: Topic): Observable<any> {
    this.globalUri = this.utils.globalUrl + "topic/inserttopic";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    return this._http.post<any>(this.globalUri, topic, {headers: headers});
  }

  resetTopic() {
    this.registerFormTopic.reset();
    this.newTopicDialog = false;
  }

  loadTopics() {
    this.apiLoadTopics().subscribe(response => {
      console.log(response);
      this.topics = response.data;
    });
  }

  apiLoadTopics(): Observable<any> {
    this.globalUri = this.utils.globalUrl + "topic/gettopics";
    return this._http.post<any>(this.globalUri,
      {syllabu_id_topic: this.idModule});
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

  get form() {
    return this.registerFormTopic.controls;
  }

  openNew() {
    this.newTopicDialog = true;
  }

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
      this.frmPhoto.patchValue({
        field: file
      });
    }
  }

}
