import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Curso} from '../models/curso';

@Injectable()
export class CargarJson {

  constructor(private http: Http) {}

  getCursos() {
    return this.http.get('https://res.cloudinary.com/bricex/raw/upload/v1657529509/samples/comun/curso.json')
      .toPromise()
      .then(res => <Curso[]> res.json().data)
      .then(data => { return data; });
  }
}
