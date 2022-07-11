import { Component, OnInit } from '@angular/core';
import { CargarJson } from '../../services/cargar-json';
import {Curso} from '../../models/curso';
import {BreadcrumbService} from '../../app.breadcrumb.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class CursosComponent implements OnInit {

  courses:Curso[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Todos los cursos', routerLink: ['/app/course']}
    ]);
  }

  ngOnInit(): void {
    this.courses = [
      {
        "name_course": "Informatica",
        "description_course": "Como tal, la informática designa a un conjunto de conocimientos teóricos y prácticos, relativos al ámbito de la ciencia y de la tecnología.",
        "keywords_coruse" : "",
        "pathimg_course": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2019/07/origen-nombres-informatica-nunca-hubieras-imaginado_2.jpg?itok=s-Z9jTJv",
        "datereg_coruse": "11-07-2022",
        "dateupdate_coruse": "11-07-2022",
        "state_coruse": "A"
      },
      {
        "name_course": "Matemática",
        "description_course": "La matemática es un conjunto de lenguajes formales que pueden usarse como herramienta para plantear problemas en contextos específicos.",
        "keywords_coruse" : "",
        "pathimg_course": "https://cdn.quonomy.com/2568/preguntasmatematicas-p.jpg",
        "datereg_coruse": "21-07-2022",
        "dateupdate_coruse": "11-07-2022",
        "state_coruse": "A"
      },
      {
        "name_course": "Lenguaje",
        "description_course": "El lenguaje es una función superior que desarrolla los procesos de simbolización relativos a la codificación y decodificación.",
        "keywords_coruse" : "",
        "pathimg_course": "https://t1.pb.ltmcdn.com/es/posts/7/1/6/caracteristicas_funcionales_y_estructurales_del_lenguaje_verbal_1617_600.jpg",
        "datereg_coruse": "15-07-2022",
        "dateupdate_coruse": "11-07-2022",
        "state_coruse": "A"
      }
    ]
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
