import {Component, OnInit} from '@angular/core';
import {Curso} from '../../models/curso';
import {BreadcrumbService} from '../../app.breadcrumb.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class CursosComponent implements OnInit {

  courses: Curso[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Todos los cursos', routerLink: ['/app/course']}
    ]);
  }

  ngOnInit(): void {

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
