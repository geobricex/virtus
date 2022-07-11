import { Component, OnInit } from '@angular/core';
import { CargarJson } from '../../services/cargar-json';
import {Curso} from '../../models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  courses:Curso[];

  constructor(private cargarJson: CargarJson) { }

  ngOnInit(): void {
    this.cargarJson.getCursos().then(courses => this.courses = courses);
  }

}
