import {Component, HostBinding, Input} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "./util/Utils";
import {AppConfigComponent} from "./app.config.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuMode = 'static';

  theme = 'absolution';

  inputStyle = 'filled';//outlined

  ripple: boolean;

  @HostBinding("style.--image-video-style")
  @Input()
  public modeStyle: string = 'none';

  @HostBinding("style.--text-color-style")
  @Input()
  public textColor: string = 'none';
  //auxiliar
  public textColorChecked: boolean = false;

  @HostBinding("style.--text-font-family")
  @Input()
  public testFontFamily: string = "'Exo 2', sans-serif";

  @HostBinding("style.--document-zoom-style")
  @Input()
  public documentZoom: string = '100%';
  //auxiliar
  public valorDocumentZoom: number = 100;


  constructor(private primengConfig: PrimeNGConfig, private _http: HttpClient, private utils: Utils) {

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.ripple = true;

  }


  ngAfterViewInit(): void {
    this.cargarConfiguracion();
  }

  /*evento de Botón para establecer colores a todos los textos*/
  switchTextColor():void{
    if(!this.textColorChecked){
      this.textColor = "none";
    }
    console.log("checked: ", this.textColorChecked, this.textColor)
  }

  /*evento para cambiar colores*/
  textColorChange(e:any):void{
    if(this.textColorChecked){
      this.textColor = e.value;
    }
    console.log("color: ", this.textColor);
  }

  controlZoom(valor: number):void{
    if(valor == 0){
      this.valorDocumentZoom = 100;
    }else{
      this.valorDocumentZoom = (this.valorDocumentZoom + valor);
      //minimo de zoom
      if(this.valorDocumentZoom < 90 ){
        this.valorDocumentZoom = 0;
      }
      //maximo de zoom
      if(this.valorDocumentZoom > 105){
        this.valorDocumentZoom = 105;
      }
    }
    this.documentZoom = (this.valorDocumentZoom  + '%');
    console.log("nuevo zoom",this.documentZoom);


  };

  listenConfigChange():void{
    console.log("Se ha modificado la configuracion de la app");
  }

  cargarConfiguracion(): void {
    let urlServicio = this.utils.globalUrl + "settings/getserviceforperson";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    this._http.post<any>(urlServicio, null, {headers: headers}).subscribe(response => {
      if(response.status == 2){
        console.log("1", (response.data));
        console.log("2", (response.data[0]));
        console.log("3", response.data[0].settingConfiguration);

        let configSaved = JSON.parse(response.data[0].settingConfiguration);
        console.log("response cargarConfiguración: ", configSaved);
        this.modeStyle = configSaved.modeStyle;
        this.textColorChecked = configSaved.textColorChecked;
        this.textColor = configSaved.textColor;
        this.documentZoom = configSaved.documentZoom;
        this.valorDocumentZoom = configSaved.valorDocumentZoom;
        this.testFontFamily = configSaved.testFontFamily.replaceAll("''", "'");
        this.changeTheme(configSaved.theme);
        //AppConfigComponent.changeTheme(configSaved.theme);
      }

    })
  }


  guardarConfiguracion(): void {
    let actualPreferences = JSON.stringify(
      {
        "theme":this.theme,
        "modeStyle": this.modeStyle,
        "textColorChecked": this.textColorChecked,
        "testFontFamily": this.testFontFamily,
        "textColor": this.textColor,
        "documentZoom": this.documentZoom,
        "valorDocumentZoom": this.valorDocumentZoom
      }
    );
    console.log(actualPreferences);

    // "datereg_setting ": "",
    // "id_setting ": "",
    // "dateupdate_setting": "",
    // "persons_id_person": -1

    let urlServicio = this.utils.globalUrl + "settings/insertservice";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    this._http.post<any>(urlServicio, {
      "setting_configuration": actualPreferences
    }, {headers: headers}).subscribe(response => {
      console.log("guardarConfiguracion: ", response);

      this.utils.showMessages(response.status, response.information, "tst");
    });
  }

  changeTheme(theme: any) {
    this.theme = theme;

    const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
    const layoutHref = 'assets/layout/css/layout-' + theme + '.css';

    this.replaceLink(layoutLink, layoutHref);

    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    const themeHref = 'assets/theme/theme-' + theme + '.css';

    this.replaceLink(themeLink, themeHref);

  }



  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement: any, href: any) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);
      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');
      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }


}
