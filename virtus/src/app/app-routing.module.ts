import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardDemoComponent } from "./pages/dashboarddemo.component";
import { CursosComponent } from './pages/cursos/cursos.component';

import { AppLoginComponent } from './pages/app.login.component';
import { AppMainpageComponent } from "./pages/app.mainpage.component";
import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { TestvoiceComponent } from './testvoice/testvoice.component'

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: AppMainpageComponent },
            { path: 'home', component: AppMainpageComponent },
            { path: 'login', component: AppLoginComponent },
            {
                path: 'app', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardDemoComponent },
                    { path: 'course', component: CursosComponent }
                ]
            },
            { path: 'login', component: AppLoginComponent },
            { path: 'testvoice', component: TestvoiceComponent },
            { path: '**', component: AppNotfoundComponent },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
