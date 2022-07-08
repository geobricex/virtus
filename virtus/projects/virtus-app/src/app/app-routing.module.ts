import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLoginComponent} from './pages/app.login.component';
import {AppMainpageComponent} from "./pages/app.mainpage.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppLoginComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
