import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

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

import { AppComponent } from './app.component';
import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import {FormsModule} from "@angular/forms";
import {DashboardDemoComponent} from "./pages/dashboarddemo.component";
import {CalendarModule} from "primeng/calendar";
import {PanelModule} from "primeng/panel";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {FullCalendarModule} from "@fullcalendar/angular";

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {AppNotfoundComponent} from "./pages/app.notfound.component";
import { CursosComponent } from './pages/cursos/cursos.component';
import {DataViewModule} from "primeng/dataview";
import {CargarJson} from "./services/cargar-json";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

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
    DashboardDemoComponent,
    AppNotfoundComponent,
    CursosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
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
    FullCalendarModule,
    DataViewModule
  ],

  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MenuService, BreadcrumbService, CargarScriptsService, CargarJson],

  bootstrap: [AppComponent]
})
export class AppModule { }
