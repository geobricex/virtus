import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardDemoComponent} from "./pages/dashboarddemo.component";
import { CursosComponent } from './pages/cursos/cursos.component';

import {AppLoginComponent} from './pages/app.login.component';
import {AppMainpageComponent} from "./pages/app.mainpage.component";
import {AppMainComponent} from "./app.main.component";
import {AppNotfoundComponent} from "./pages/app.notfound.component";
import {MiscursosComponent} from "./pages/miscursos/miscursos.component";
import {TemasComponent} from "./pages/temas/temas.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppMainpageComponent},
            {path: 'home', component: AppMainpageComponent},
            {path: 'login', component: AppLoginComponent},
            {path: 'app', component: AppMainComponent,
              children: [
                {path: '', component: DashboardDemoComponent},
                {path: 'course', component: CursosComponent},
                {path: 'mycourse', component: MiscursosComponent},
                {path: 'mycourse/themes', component: TemasComponent}
                ]
            },
            {path: 'login', component: AppLoginComponent},
            {path: '**', component: AppNotfoundComponent},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
