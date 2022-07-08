import { Component, OnInit } from '@angular/core';
//import {Artyom} from '@types/artyom.js';
//import {Artyom} from 'artyom.js/build/artyom';
import Artyom from '../../../../../node_modules/artyom.js/build/artyom.window.min.js';
//import Artyom from 'artyom.js';

@Component({
  selector: 'app-testvoice',
  templateUrl: './testvoice.component.html',
  styleUrls: ['./testvoice.component.css']
})
export class TestvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Hola");

    const artyom = new Artyom();

    var commandHello = {
      indexes: ["hello", "good morning", "hey"], // These spoken words will trigger the execution of the command
      action: function () { // Action to be executed when a index match with spoken word
        artyom.say("Hey buddy ! How are you today?");
      }
    };

    artyom.addCommands(commandHello);

  }

}
