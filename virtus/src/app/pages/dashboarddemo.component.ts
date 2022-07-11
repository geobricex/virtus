import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../app.breadcrumb.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Inicio', routerLink: ['/app']}
    ]);
  }

  ngOnInit() {

  }
}
