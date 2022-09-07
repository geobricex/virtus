import {Component, Input, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {User} from './models/user';
import {StorageService} from "./authentication/StorageService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  template: `
    <ul class="layout-menu">
      <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
  `
})
export class AppMenuComponent implements OnInit {

  model: any[];

  public user: User;

  constructor(public app: AppMainComponent, private storageService: StorageService, public router: Router) {
  }

  ngOnInit() {
    //location.reload();
    console.log(this.storageService);
    this.user = this.storageService.getCurrentUser();
    console.log(this.user);

    if (this.user === undefined) {
      this.router.navigateByUrl('/login');
    } else if (this.user.type_person === "R") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        // {label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/app/coursear']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript;'],
          items: [
            {label: 'Todos los cursos activos', icon: 'pi pi-fw pi-box', routerLink: ['/app/coursear']},
            {
              label: 'Todos los cursos inactivos',
              icon: 'pi pi-fw pi-file-excel',
              routerLink: ['/app/courseinactivear']
            },
            // {label: 'Mis cursos agregados', icon: 'pi pi-fw pi-folder-open', routerLink: ['/app/coursear']},
          ]
        },
        {label: 'Gestión de usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/app/admins/useradministration']},
        // {label: 'Solicitudes', icon: 'pi pi-comments', routerLink: ['/app/admins/requestssuggestions']},
        // {
        //   label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/javascript;'],
        //   items: [
        //     {label: 'Puntaje/Tiempo', icon: 'pi pi-fw pi-th-large', routerLink: ['/app/reports/scorereport']},
        //     {label: 'Revisión de intentos', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/reports/intentreview']}
        //   ]
        // },
        {
          label: 'Más', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/javascript;'],
          items: [
            {label: 'Acerca de', icon: 'pi pi-fw pi-globe', routerLink: ['/app/about']},
            {label: 'Información', icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/information']},
            // {label: 'Juegos', icon: 'pi pi-fw pi-slack', routerLink: ['/app/games']},
          ]
        },
      ];
    } else if (this.user.type_person === "A") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        // {label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/app/coursear']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript;'],
          items: [
            {label: 'Todos los cursos activos', icon: 'pi pi-fw pi-box', routerLink: ['/app/coursear']},
            {
              label: 'Todos los cursos inactivos',
              icon: 'pi pi-fw pi-file-excel',
              routerLink: ['/app/courseinactivear']
            },
            // {label: 'Mis cursos agregados', icon: 'pi pi-fw pi-folder-open', routerLink: ['/app/coursear']},
          ]
        },
        {label: 'Gestión de usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/app/admins/useradministration']},
        // {label: 'Solicitudes', icon: 'pi pi-comments', routerLink: ['/app/admins/requestssuggestions']},
        // {
        //   label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/javascript;'],
        //   items: [
        //     {label: 'Puntaje/Tiempo', icon: 'pi pi-fw pi-th-large', routerLink: ['/app/reports/scorereport']},
        //     {label: 'Revisión de intentos', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/reports/intentreview']}
        //   ]
        // },
        {
          label: 'Más', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/javascript;'],
          items: [
            {label: 'Acerca de', icon: 'pi pi-fw pi-globe', routerLink: ['/app/about']},
            {label: 'Información', icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/information']},
            // {label: 'Juegos', icon: 'pi pi-fw pi-slack', routerLink: ['/app/games']},
          ]
        },

      ];
    } else if (this.user.type_person === "I") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript;'],
          items: [
            {label: 'Todos los cursos', icon: 'pi pi-fw pi-box', routerLink: ['/app/course']},
            {label: 'Mis cursos', icon: 'pi pi-fw pi-inbox', routerLink: ['/app/mycourse']},
            // {label: 'Favoritos', icon: 'pi pi-fw pi-heart-fill', routerLink: ['/app/general/favorites']}
          ]
        },
        {
          label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/javascript;'],
          items: [
            {label: 'Tiempo/Puntaje', icon: 'pi pi-fw pi-clock', routerLink: ['/app/reports/timereport']},
            {label: 'Revisión de intentos', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/reports/intentreview']}
          ]
        },
        {
          label: 'Más', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/javascript;'],
          items: [
            {label: 'Acerca de', icon: 'pi pi-fw pi-globe', routerLink: ['/app/about']},
            {label: 'Información', icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/information']},
            // {label: 'Juegos', icon: 'pi pi-fw pi-slack', routerLink: ['/app/games']},
          ]
        },
      ];
    } else if (this.user.type_person === "E") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript;'],
          items: [
            {label: 'Todos los cursos', icon: 'pi pi-fw pi-box', routerLink: ['/app/course']},
            {label: 'Mis cursos', icon: 'pi pi-fw pi-inbox', routerLink: ['/app/mycourse']},
            // {label: 'Favoritos', icon: 'pi pi-fw pi-heart-fill', routerLink: ['/app/general/favorites']}
          ]
        },
        {
          label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/javascript;'],
          items: [
            {label: 'Tiempo/Puntaje', icon: 'pi pi-fw pi-clock', routerLink: ['/app/reports/timereport']},
            {label: 'Revisión de intentos', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/reports/intentreview']}
          ]
        }
      ];
    } else if (this.user.type_person === "U") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript;'],
          items: [
            {label: 'Todos los cursos', icon: 'pi pi-fw pi-box', routerLink: ['/app/course']},
            {label: 'Mis cursos', icon: 'pi pi-fw pi-inbox', routerLink: ['/app/mycourse']},
            // {label: 'Favoritos', icon: 'pi pi-fw pi-heart-fill', routerLink: ['/app/general/favorites']}
          ]
        },
        // {label: 'Recursos', icon: 'pi pi-fw pi-folder-open', routerLink: ['/app/r']},
        {
          label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/javascript;'],
          items: [
            {label: 'Tiempo/Puntaje', icon: 'pi pi-fw pi-clock', routerLink: ['/app/reports/timereport']},
            {label: 'Revisión de intentos', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/reports/intentreview']}
          ]
        },
        {
          label: 'Más', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/javascript;'],
          items: [
            {label: 'Acerca de', icon: 'pi pi-fw pi-globe', routerLink: ['/app/about']},
            {label: 'Información', icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/information']},
            // {label: 'Juegos', icon: 'pi pi-fw pi-slack', routerLink: ['/app/games']},
          ]
        },
      ];
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
