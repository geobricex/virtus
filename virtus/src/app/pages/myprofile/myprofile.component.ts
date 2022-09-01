import {Component, OnInit} from '@angular/core';
import {Person} from "../../models/Person";
import {Observable} from "rxjs";
import {Utils} from "../../util/Utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user";
import {StorageService} from "../../authentication/StorageService";
import {Session} from "../../models/session";

import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import PocketBase from "pocketbase";
import {Message} from "primeng/api";
import {BreadcrumbService} from "../../app.breadcrumb.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  person: Person;
  public session: Session;
  globalUri: string = "";
  editar_datos: boolean;
  formUpdatePhto: boolean;
  tmpFile: any;
  client: any;
  urlimageupload: any;

  msgs: Message[] = [];

  frmPhoto = new FormGroup({
    firstName: new FormControl()
  });

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utils: Utils,
    private _http: HttpClient,
    private storageService: StorageService
  ) {
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app/']},
      {label: 'Perfil', routerLink: ['/app/myprofile']},
    ]);

  }

  ngOnInit(): void {
    this.session = this.storageService.getCurrentSession();
    this.editar_datos = false;
    this.formUpdatePhto = false;
    // https://aplicaciones.uteq.edu.ec:9549
    this.client = new PocketBase("https://fyc.uteq.edu.ec:9549");
    let resp = this.initPocket();
    console.log(resp);
    console.log(this.session.token);
    this.apiGetPerson().subscribe(response => {
      console.log(response)
      this.person = new Person(response.id, response.namePerson, response.lastnamePerson,
        response.emailPerson, response.typePerson, response.pathimgPerson, response.codeverificationPerson, response.dateregPerson,
        response.dateupdatePerson, response.providerPerson, response.idLocation);
      this.person._passwordPerson = response.passwordPerson;
    });
  }

  showUpdatePhoto() {
    this.formUpdatePhto = true;
    this.urlimageupload = this.person._pathimgPerson;
  }

  initPocket(): Observable<any> {
    return this.client.Admins.authViaEmail("anthony.pachay2017@uteq.edu.ec", "Abc1234567");
  }

  apiGetPerson(): Observable<any> {
    this.globalUri = "virtusbk/persons/getperson";
    return this._http.post(this.globalUri, {
      "sessionToken": this.session.token,
    },);
  }

  updateDataPerson() {
    console.log(this.person);
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Virtus', detail: 'Procesando...'});
    this.apiupdateDataPerson(this.person).subscribe(response => {
      this.msgs = [];
      this.utils.showMessages(2, "Datos actualizados exitosamente.", "tst");
      this.editar_datos = false;
    });
  }

  apiupdateDataPerson(person: Person): Observable<any> {
    this.globalUri = "virtusbk/persons";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.session.token);
    return this._http.put<Person>(this.globalUri, person, {headers: headers});
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

  updatePhtoProfile() {
    this.changeImage().then(response => {
      console.log(response);
      console.log(this.makePathRecurso(response))
      this.person._pathimgPerson = this.makePathRecurso(response);
      this.apiupdateDataPerson(this.person).subscribe(response => {
        this.utils.showMessages(2, "Foto de perfil actualizada exitosamente.", "tst");
        this.editar_datos = false;
        this.formUpdatePhto = false;
      });
    });
  }

  async changeImage(): Promise<any> {
    let formData01 = new FormData();
    formData01.append('field', this.tmpFile);
    //console.log("test02", typeof (this.tmpFile), this.tmpFile);
    return await this.client.Records.create("archivos", formData01);
  }

  makePathRecurso(element: any): string {
    var urlRecurso: string = "https://fyc.uteq.edu.ec:9549" + "/api/files/" + element["@collectionName"] + "/" + element.id + "/" + element.field;// +"/" ;
    return urlRecurso;
  }

}
