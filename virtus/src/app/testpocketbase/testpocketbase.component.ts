import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import PocketBase from 'pocketbase';

@Component({
  selector: 'app-testpocketbase',
  templateUrl: './testpocketbase.component.html',
  styleUrls: ['./testpocketbase.component.scss']
})
export class TestpocketbaseComponent implements OnInit {

  pathImg: string;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.initPocketBase().subscribe(response => {
      // do some action
      console.log("inicio: ", response.token);
      this.listarImagenes(response.token).subscribe(listas => {
        console.log("listas: ", listas);
      });
      this.pathImg = this.mostarImagen(response.token, "GPPzWD6nnKtS8ZK");
      console.log("pathImg: " + this.pathImg);

    });

  }

  initPocketBase(): Observable<any> {
    var globalUri: string = 'http://localhost:8090';
    var urltoken: string = globalUri + "/api/admins/auth-via-email";

    return this._http.post(urltoken, { "email": "anthony.pachay2017@uteq.edu.ec", "password": "Abc1234567" });
  }

  listarImagenes(token: string): Observable<any> {
    var globalUri: string = 'http://localhost:8090';

    var urlServicio: string = globalUri + "/api/collections/archivos/records?page=1&perPage=10";// +"/GPPzWD6nnKtS8ZK" ;
    var headers = new HttpHeaders()//.set('Content-Type', 'application/json')
      .set('Authorization', 'Admin ' + token);
    return this._http.get(urlServicio, { headers: headers });
  }

  mostarImagen(token: string, idImagen: string): string {
    var globalUri: string = 'http://localhost:8090';

    //var urlServicio: string = globalUri + "/api/collections/archivos/records/" + idImagen + "?expand=rel1,rel2.subrel21.subrel22";// +"/" ;
    var urlServicio: string = globalUri + "/api/files/archivos/" + idImagen + "/hDcEihCa55IszgwfOiQ3LBEaP1qNj4gv.jpg";// +"/" ;
    return urlServicio;
  }

  insetarImagenes(token: string): Observable<any> {
    var globalUri: string = 'http://localhost:8090/';

    var urlServicio: string = globalUri + "/api/collections/archivos/records";
    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Admin ' + token);
    let objectJson = JSON.stringify({
      "nombre": "anthony"
    });
    return this._http.post(urlServicio, objectJson, { headers: headers });
  }
}
