import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

@Component({
  selector: 'app-cursos-ar',
  templateUrl: './cursos-ar.component.html',
  styleUrls: ['./cursos-ar.component.scss']
})
export class CursosArComponent implements OnInit {

  newcourse_dialog: boolean;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/app/coursear']}
    ]);
  }

  ngOnInit(): void {
  }

  openNew() {
    this.newcourse_dialog = true;
  }

}
