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

//INICIO SERVICE
import {CargarScriptsService} from "./services/cargar-scripts.service"
// FIN SERVICES

import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import {FormsModule} from "@angular/forms";
import {DashboardDemoComponent} from "./pages/dashboard/dashboarddemo.component";
import {CalendarModule} from "primeng/calendar";
import {PanelModule} from "primeng/panel";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {FullCalendarModule} from "@fullcalendar/angular";

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
    AppFooterComponent,
    DashboardDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    CalendarModule,
    PanelModule,
    CheckboxModule,
    InputTextareaModule,
    TableModule,
    FullCalendarModule
  ],

  providers: [MenuService, BreadcrumbService, CargarScriptsService],

  bootstrap: [AppComponent]
})
export class AppModule { }
