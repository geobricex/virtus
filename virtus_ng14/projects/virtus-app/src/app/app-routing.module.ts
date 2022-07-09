import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLoginComponent} from './pages/app.login.component';
import {AppMainpageComponent} from "./pages/app.mainpage.component";
import {AppMainComponent} from "./app.main.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppLoginComponent},
            {path: 'app', component: AppMainComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
