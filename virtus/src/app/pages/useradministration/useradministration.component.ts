import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

@Component({
  selector: 'app-useradministration',
  templateUrl: './useradministration.component.html',
  styleUrls: ['./useradministration.component.scss']
})
export class UseradministrationComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService,) {
    this.breadcrumbService.setItems([
      {label: 'Gestión de Usuario', routerLink: ['/app/useradministration']},
    ]);
  }

  ngOnInit(): void {
  }

}
