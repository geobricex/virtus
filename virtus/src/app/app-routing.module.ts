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
import {TestpocketbaseComponent} from './testpocketbase/testpocketbase.component'
import {CursosArComponent} from "./pages/cursos-ar/cursos-ar.component";
import {VerifyAccountComponent} from "./pages/verify-account/verify-account.component";
import {MyprofileComponent} from "./pages/myprofile/myprofile.component";
import {QuestionnaireComponent} from "./pages/questionnaire/questionnaire.component";
import {ModuloarComponent} from "./pages/moduloar/moduloar.component";
import {TopicarComponent} from "./pages/topicar/topicar.component";
import {ResourcesComponent} from "./pages/resources/resources.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: AppMainpageComponent},
      {path: 'home', component: AppMainpageComponent},
      {path: 'login', component: AppLoginComponent},
      {path: 'singup', component: SingupComponent},
      {path: 'verify/:email/:code', component: VerifyAccountComponent},
      {
        path: 'app', component: AppMainComponent,
        children: [
          {path: '', component: DashboardDemoComponent},
          {path: 'myprofile', component: MyprofileComponent},
          {path: 'course', component: CursosComponent},
          {path: 'coursear', component: CursosArComponent},
          {path: 'coursear/modulear/:idcourse', component: ModuloarComponent},
          {path: 'coursear/modulear/:idcourse/topicar/:idmodule', component: TopicarComponent},
          {path: 'mycourse', component: MiscursosComponent},
          {
            path: 'mycourse/modules/:idcourse/themes/:idmodule/resources/:idTopic/questionnaire/:ideva',
            component: QuestionnaireComponent
          },
          {path: 'mycourse/modules/:idcourse', component: ModuloComponent},
          {path: 'mycourse/modules/:idcourse/themes/:idmodule', component: TemasComponent},
          {path: 'mycourse/modules/:idcourse/themes/:idmodule/resources/:idTopic', component: ResourcesComponent}
        ]
      },
      {path: 'login', component: AppLoginComponent},
      {path: 'testvoice', component: TestvoiceComponent},
      {path: 'testpocket', component: TestpocketbaseComponent},
      {path: '**', component: AppNotfoundComponent},
    ], {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
