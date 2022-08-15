import {Component, HostBinding, Input} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

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

  @HostBinding("style.--document-zoom-style")
  @Input()
  public documentZoom: string = '100%';
  //auxiliar
  public valorDocumentZoom: number = 100;


  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.ripple = true;

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
      this.valorDocumentZoom = (this.valorDocumentZoom + ( 1 * valor));
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
}
