import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {Course} from "../../models/Course";

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.component.html',
  styleUrls: ['./miscursos.component.scss']
})
export class MiscursosComponent implements OnInit {

  courses: Course[];

  sortOrder: number;

  sortField: string;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cursos', routerLink: ['/']},
      {label: 'Mis cursos', routerLink: ['/app/mycourse']}
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
