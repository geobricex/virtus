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
  constructor(private _CargarScriptsService: CargarScriptsService /*public sanitizer: DomSanitizer*/) {
    // this.cssUrl = './app.pagemain.component.css';
    _CargarScriptsService.loadingService(["https://res.cloudinary.com/bricex/raw/upload/v1657340119/library/mainpage.js"]);
    //_CargarScriptsService.loadingService(["../assets/scripts/library/artyom.window.min.js"]);
    //_CargarScriptsService.loadingService(["../assets/scripts/js/manager_voice.js"]);
    _CargarScriptsService.loadingService([
      "https://res.cloudinary.com/bricex/raw/upload/v1657504142/library/artyom.window.min.js",//"../assets/scripts/library/artyom.window.min.js",
      "https://res.cloudinary.com/bricex/raw/upload/v1657504244/library/manager_voice.js"//"../assets/scripts/js/manager_voice.js"
    ]);
  }

}
