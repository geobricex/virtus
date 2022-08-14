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
  public modeStyle: string = 'img_style_color_none';


  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.ripple = true;

  }
}
