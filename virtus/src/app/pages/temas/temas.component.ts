import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Tema} from "../../models/tema";

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  temas: Tema[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules']},
      {label: 'Temas', routerLink: ['/app/mycourse/modules/themes']}
    ]);
  }

  ngOnInit(): void {
    this.temas = [{
      name_theme: "Conceptos básicos",
      description_theme: "Descripcion de los conceptos basicos",
      keywords_theme: "concepto basico primero",
      pathimg_theme: "https://i.ytimg.com/vi/giw-HxZKY2o/maxresdefault.jpg",
      datereg_theme: "18-07-2022",
      dateupdate_theme: "18-07-2022",
      state_theme: "A"
    },
      {
        name_theme: "Hardware",
        description_theme: "Descripcion de los componentes hardware",
        keywords_theme: "concepto basico primero",
        pathimg_theme: "https://bibliotecadeinvestigaciones.files.wordpress.com/2013/01/pc-hardware-0.jpg",
        datereg_theme: "18-07-2022",
        dateupdate_theme: "18-07-2022",
        state_theme: "A"
      }]
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

}
