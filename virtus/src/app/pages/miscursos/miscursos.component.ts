import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {Curso} from "../../models/curso";

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.component.html',
  styleUrls: ['./miscursos.component.scss']
})
export class MiscursosComponent implements OnInit {

  courses:Curso[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']}
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
