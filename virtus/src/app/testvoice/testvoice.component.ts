import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';

@Component({
  selector: 'app-testvoice',
  templateUrl: './testvoice.component.html',
  styleUrls: ['./testvoice.component.css']
})
export class TestvoiceComponent implements OnInit {

  constructor(private _CargarScripts: CargarScriptsService) {
    
  }

  ngOnInit(): void {
    console.log("Load Test....")
  }

}
