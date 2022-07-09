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
    _CargarScriptsService.loadingService(["https://res.cloudinary.com/bricex/raw/upload/v1657340119/library/io35k5oiz9vltw6cohvf.js",
      "https://code.jquery.com/jquery-3.4.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"]);

  }

}
