import { Component } from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
import { CargarScriptsService } from "../services/cargar-scripts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.pagemain.component.html',
  styleUrls: ['./app.pagemain.component.css']
})
export class AppMainpageComponent {
 // title = 'dinamic-styles';
 // cssUrl: string;
  constructor( private  _CargarScriptsService:CargarScriptsService /*public sanitizer: DomSanitizer*/) {
   // this.cssUrl = './app.pagemain.component.css';
    _CargarScriptsService.loadingService(["https://res.cloudinary.com/bricex/raw/upload/v1657340119/library/io35k5oiz9vltw6cohvf.js"]);

  }

}
