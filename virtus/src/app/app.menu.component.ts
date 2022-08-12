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
        {label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/app/coursear']},
        {label: 'Gestión de usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/javascript']}
      ];
    } else if (this.user.type_person === "A") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        {label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/app/coursear']},
        {label: 'Gestión de usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/app/']},
        {label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/app/']}
      ];
    } else if (this.user.type_person === "U") {
      this.model = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app']},
        {
          label: 'Cursos', icon: 'pi pi-fw pi-book', routerLink: ['/javascript'],
          items: [
            {label: 'Todos los cursos', icon: 'pi pi-fw pi-box', routerLink: ['/app/course']},
            {label: 'Mis cursos', icon: 'pi pi-fw pi-inbox', routerLink: ['/app/mycourse']},
            {label: 'Favoritos', icon: 'pi pi-fw pi-heart-fill', routerLink: ['/b']}
          ]
        },
        {label: 'Recursos', icon: 'pi pi-fw pi-folder-open', routerLink: ['/c']},
        {
          label: 'Reportes', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/d'],
          items: [
            {label: 'Tiempo', icon: 'pi pi-fw pi-clock', routerLink: ['/b']},
            {label: 'Puntaje', icon: 'pi pi-fw pi-th-large', routerLink: ['/b']}
          ]
        }
      ];
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
