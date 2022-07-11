import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Temas', routerLink: ['/app/course/themes']}
    ]);
  }

  ngOnInit(): void {
  }

}
