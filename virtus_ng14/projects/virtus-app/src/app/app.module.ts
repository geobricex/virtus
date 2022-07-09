import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppMainpageComponent } from './pages/app.mainpage.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AppMainComponent} from "./app.main.component";
import {AppTopBarComponent} from "./app.topbar.component";
import {AppMenuComponent} from "./app.menu.component";
import {AppMenuitemComponent} from "./app.menuitem.component";
import {AppBreadcrumbComponent} from "./app.breadcrumb.component";
import {AppFooterComponent} from "./app.footer.component";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMainpageComponent,
    AppLoginComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppBreadcrumbComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
