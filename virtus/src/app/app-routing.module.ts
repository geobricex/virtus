import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from "./pages/dashboarddemo.component";
import {AppLoginComponent} from './pages/app.login.component';
import {AppMainpageComponent} from "./pages/app.mainpage.component";
import {AppMainComponent} from "./app.main.component";
import {AppNotfoundComponent} from "./pages/app.notfound.component";
import {CursosComponent} from './pages/cursos/cursos.component';
import {FavoritesComponent} from './pages/general/favorites/favorites.component';
import {MiscursosComponent} from "./pages/miscursos/miscursos.component";
import {TemasComponent} from "./pages/temas/temas.component";
import {SingupComponent} from "./pages/singup/singup.component";
import {ModuloComponent} from "./pages/modulo/modulo.component";
import {TestvoiceComponent} from './tests/testvoice/testvoice.component'
import {TestpocketbaseComponent} from './tests/testpocketbase/testpocketbase.component'
import {CursosArComponent} from "./pages/cursos-ar/cursos-ar.component";
import {CursosArInactiveComponent} from "./pages/cursos-ar-inactive/cursos-ar-inactive.component";
import {VerifyAccountComponent} from "./pages/verify-account/verify-account.component";
import {MyprofileComponent} from "./pages/myprofile/myprofile.component";
import {QuestionnaireComponent} from "./pages/questionnaire/questionnaire.component";
import {ModuloarComponent} from "./pages/moduloar/moduloar.component";
import {TopicarComponent} from "./pages/topicar/topicar.component";
import {ResourcesComponent} from "./pages/resources/resources.component";
import {ResourcesarComponent} from "./pages/resourcesar/resourcesar.component";
import {UseradministrationComponent} from "./pages/admins/useradministration/useradministration.component";
import {RequestssuggestionsComponent} from "./pages/admins/requestssuggestions/requestssuggestions.component";
import {EvaluationComponent} from "./pages/evaluation/evaluation.component";
import {IntentreviewComponent} from "./pages/reports/intentreview/intentreview.component";
import {ScorereportComponent} from "./pages/reports/scorereport/scorereport.component";
import {TimereportComponent} from "./pages/reports/timereport/timereport.component";
import {GamesComponent} from "./pages/games/games.component";

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
          {path: 'games', component: GamesComponent},
          {path: 'myprofile', component: MyprofileComponent},
          {path: 'course', component: CursosComponent},
          {path: 'general/favorites', component: FavoritesComponent},
          {path: 'coursear', component: CursosArComponent},
          {path: 'courseinactivear', component: CursosArInactiveComponent},
          {path: 'admins/useradministration', component: UseradministrationComponent},
          {path: 'admins/requestssuggestions', component: RequestssuggestionsComponent},
          {path: 'reports/timereport', component: TimereportComponent},
          {path: 'reports/scorereport', component: ScorereportComponent},
          {path: 'reports/intentreview', component: IntentreviewComponent},
          {path: 'coursear/modulear/:idcourse', component: ModuloarComponent},
          {path: 'coursear/modulear/:idcourse/topicar/:idmodule', component: TopicarComponent},
          {path: 'coursear/modulear/:idcourse/topicar/:idmodule/resourcesar/:idTopic', component: ResourcesarComponent},
          {path: 'mycourse', component: MiscursosComponent},
          {
            path: 'mycourse/modules/:idcourse/themes/:idmodule/resources/:idTopic/questionnaire/:ideva',
            component: QuestionnaireComponent
          },
          {
            path: 'mycourse/modules/:idcourse/themes/:idmodule/resources/:idTopic/evaluation/:ideva',
            component: EvaluationComponent
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
