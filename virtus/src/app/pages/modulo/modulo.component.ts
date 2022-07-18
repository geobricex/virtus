import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Modulo} from "../../models/modulo";

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit {

  modulos: Modulo[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']},
      {label: 'Modulos', routerLink: ['/app/mycourse/modules']}
    ]);
  }

  ngOnInit(): void {
    this.modulos = [
      {
        name_module: "¿Qué es una computadora?",
        description_module: "Descripcion de que es una computadura bonita",
        keywords_module: "compu lapto",
        pathimg_module: "https://pcredcom.com/blog/wp-content/uploads/2020/05/Elegir-computadora-ideal-2.jpeg",
        datereg_module: "17-07-2022",
        dateupdate_module: "17-07-2022",
        state_module: "A"
      }
    ]
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
