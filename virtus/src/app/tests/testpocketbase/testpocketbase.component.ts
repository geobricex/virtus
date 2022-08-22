import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import PocketBase from 'pocketbase';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';

//require('cross-fetch/polyfill');
declare const armadillo: any;

@Component({
  selector: 'app-testpocketbase',
  templateUrl: './testpocketbase.component.html',
  styleUrls: ['./testpocketbase.component.scss']
})
export class TestpocketbaseComponent implements OnInit {

  tokenAccess: string;
  elementsImg: any;
  testArmadillo: any;

  tmpFile: any;

  myForm = new FormGroup({
    field: new FormControl('', [Validators.required])
  });


  myGroup = new FormGroup({
    firstName: new FormControl()
  });

  globalUri: string = "https://aplicaciones.uteq.edu.ec:9549";

  constructor(private _http: HttpClient) {
  }

  initPocket(): Observable<any> {
    return this.client.Admins.authViaEmail("anthony.pachay2017@uteq.edu.ec", "Abc1234567");
    ;
  }

  client: any;

  ngOnInit(): void {
    // @ts-ignore
    this.testArmadillo = getHackDiagram("This use case starts when a person *(person &-id=int) wants to register as a tutor *(tutor &-id=int [+userRegistration=Tutor]) user in the system. *¡(tutor)<>*(Person)¡")

    console.log(
      // @ts-ignore
      this.testArmadillo[1]
    )
    this.client = new PocketBase(this.globalUri);
    console.log(" -- -- ");
    let resp = this.initPocket();
    console.log(resp);

    //let listaImg = this.listarImagenes();
    //console.log(listaImg);
    this.listarImagenes().then(listas => {
      console.log("listas: ", listas);
      this.elementsImg = listas.items;
    });


    /*this.initPocketBase().subscribe(response => {
      // do some action
      this.tokenAccess = response.token;
      console.log("inicio: ", response.token);
      this.listarImagenes(response.token).subscribe(listas => {
        console.log("listas: ", listas);
        this.elementsImg = listas.items;
      });
      //this.pathImg = this.mostarImagen(response.token, "BNLvZsE9FS7qy5M");
      //console.log("pathImg: " + this.pathImg);

    });*/

  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.tmpFile = file;
      this.myForm.patchValue({
        field: file
      });
    }
  }

  guardarArchivo() {
    console.log(this.tmpFile);
    if (this.tmpFile != undefined) {
      /*this.insetarImagenes(this.tokenAccess).subscribe(response => {
        console.log("resultado: ", response);
      });*/
      this.insetarImagenes2().then(respuesta => {
        console.log("respuesta: ", respuesta);
        console.log(this.makePathRecurso(respuesta));
      });
    }
  }

  async insetarImagenes2(): Promise<any> {

    let formData01 = new FormData();
    formData01.append('field', this.tmpFile);
    //console.log("test02", typeof (this.tmpFile), this.tmpFile);
    return await this.client.Records.create("archivos", formData01);
  }

  async listarImagenes(): Promise<any> {
    return await this.client.Records.getList("archivos", 1, 20);
  }


  /*REST*/

  initPocketBaseRest(): Observable<any> {
    var urltoken: string = this.globalUri + "/api/admins/auth-via-email";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this._http.post(urltoken, {
      "email": "anthony.pachay2017@uteq.edu.ec",
      "password": "Abc1234567"
    }, {'headers': headers});
  }

  listarImagenesRest(token: string): Observable<any> {
    var urlServicio: string = this.globalUri + "/api/collections/archivos/records?page=1&perPage=10";// +"/GPPzWD6nnKtS8ZK" ;
    var headers = new HttpHeaders()//.set('Content-Type', 'application/json')
      .set('Authorization', 'Admin ' + token);
    return this._http.get(urlServicio, {headers: headers});
  }

  makePathRecurso(element: any): string {
    //var urlServicio: string = globalUri + "/api/collections/archivos/records/" + idImagen + "?expand=rel1,rel2.subrel21.subrel22";// +"/" ;
    var urlRecurso: string = this.globalUri + "/api/files/" + element["@collectionName"] + "/" + element.id + "/" + element.field;// +"/" ;
    //console.log(urlRecurso);
    return urlRecurso;
  }


  insetarImagenesRest(token: string): Observable<any> {

    let formData01 = new FormData();

    console.log("test02", typeof (this.tmpFile), this.tmpFile);
    formData01.append('file', this.myForm.get('field')?.value);

    var urlServicio: string = this.globalUri + "/api/collections/archivos/records";
    var headers = new HttpHeaders().set('Content-Type', 'multipart/form-data')
      .set('Authorization', 'Admin ' + token);
    return this._http.post(urlServicio, formData01, {headers: headers});

  }

  insetarJsonRest(token: string): Observable<any> {
    var urlServicio: string = this.globalUri + "/api/collections/archivos/records";
    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Admin ' + token);
    let objectJson = JSON.stringify({
      "nombre": "anthony"
    });
    return this._http.post(urlServicio, objectJson, {headers: headers});
  }

  interpreteTest() {

  }

}
