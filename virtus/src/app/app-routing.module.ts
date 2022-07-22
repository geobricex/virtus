import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from "./pages/dashboarddemo.component";
import {CursosComponent} from './pages/cursos/cursos.component';

import {AppLoginComponent} from './pages/app.login.component';
import {AppMainpageComponent} from "./pages/app.mainpage.component";
import {AppMainComponent} from "./app.main.component";
import {AppNotfoundComponent} from "./pages/app.notfound.component";
import {MiscursosComponent} from "./pages/miscursos/miscursos.component";
import {TemasComponent} from "./pages/temas/temas.component";
import {SingupComponent} from "./pages/singup/singup.component";
import {ModuloComponent} from "./pages/modulo/modulo.component";
import {TestvoiceComponent} from './testvoice/testvoice.component'
import {CursosArComponent} from "./pages/cursos-ar/cursos-ar.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: AppMainpageComponent},
      {path: 'home', component: AppMainpageComponent},
      {path: 'login', component: AppLoginComponent},
      {path: 'singup', component: SingupComponent},
      {
        path: 'app', component: AppMainComponent,
        children: [
          {path: '', component: DashboardDemoComponent},
          {path: 'course', component: CursosComponent},
          {path: 'coursear', component: CursosArComponent},
          {path: 'mycourse', component: MiscursosComponent},
          {path: 'mycourse/modules', component: ModuloComponent},
          {path: 'mycourse/modules/themes', component: TemasComponent}
        ]
      },
      {path: 'login', component: AppLoginComponent},
      {path: 'testvoice', component: TestvoiceComponent},
      {path: '**', component: AppNotfoundComponent},
    ], {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
