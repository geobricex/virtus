import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';

declare var Artyom: any;

@Component({
  selector: 'app-testvoice',
  templateUrl: './testvoice.component.html',
  styleUrls: ['./testvoice.component.css']
})
export class TestvoiceComponent implements OnInit {

  private artyom: any = new Artyom();

  constructor(private _CargarScripts: CargarScriptsService) {
    console.log("Load Test....");
  }

  ngOnInit(): void {
    console.log("Load Test....");


    console.log("Fin _ Cargar artyomJS");

    console.log(window.hasOwnProperty('webkitSpeechRecognition') && window.hasOwnProperty('speechSynthesis'));


    this.startContinuousArtyom();
  }

  startContinuousArtyom(): void {

    //this.artyom.fatality();
    //setTimeout(function () {

      this.artyom.addCommands({
        indexes:["Hello","Hey","Hurra"],
        action: function(i:any){
          // i = index of the recognized option
          console.log("Something matches", i);
          //this.artyom.say("hola encontrado ");
        }
      });

      this.artyom.addCommands({
        //smart:true,// We need to say that this command is smart !
        indexes:["literal"], // * = the spoken text after How many people live in is recognized
        action:function(i:any, wildcard:string ){
          this.artyom.say("auxiliar: " + wildcard);
        }
      });
      /*artyom.addCommands([
        {
          indexes: ["a", "avión", "avion"],
          action: function (i: any) {
            console.log("Literal A");
            artyom.say("Literal A");
          }
        }, {
          indexes: ["b", "burro", "bicicleta"],
          action: function (i: any) {
            console.log("Literal B");
            artyom.say("Literal B");
          }
        }, {
          indexes: ["c", "conejo", "caballo"],
          action: function (i: any) {
            console.log("Literal c");
            artyom.say("Literal C");
          }
        }, {
          indexes: ["d", "dedo", "delfin"],
          action: function (i: any) {
            console.log("Literal d");
            artyom.say("Literal d");
          }
        }, {
          indexes: ["e", "elefante"],
          action: function (i: any) {
            console.log("Literal e");
            artyom.say("Literal e");
          }
        }, {
          indexes: ["f", "flor", , "foca"],
          action: function (i: any) {
            console.log("Literal f");
            artyom.say("Literal f");
          }
        }
      ]);*/

      // Or the artisan mode to write less

      this.artyom.on(["Buenos días"]).then(function (i: any) {
        console.log("Triggered");
      });

      this.artyom.say("Buenos días, indique el literal correcto");

      this.artyom.say("buenos dias", {
        onStart: function () {
          console.log("Talking ...");
        },
        onEnd: function () {
          console.log("I said all that i knew");
        }
      });

      /*var UserDictation = artyom.newDictation({
        continuous: true, // Enable continuous if HTTPS connection
        onResult: function (text: string) {
          // Do something with the text
          console.log(text);
        },
        onStart: function () {
          console.log("Dictation started by the user");
        },
        onEnd: function () {
          alert("Dictation stopped by the user");
        }
      });

      UserDictation.start();*/

    //}, 250);

    this.artyom.initialize({
      lang: "es-ES",
      continuous: false, // Artyom will listen forever
      debug: true, // Show what recognizes in the Console
      listen: true, // Start listening after this
      speed: 0.9, // Talk a little bit slow
      mode: "normal" // This parameter is not required as it will be normal by default
    }).then(function () {
      console.log("Ready to work!");
    });
  }

  probarcomando() {
    console.log("¿Cual es el nombre del periferico preferido al momento de interactuar con la computadora?");
    this.artyom.say("¿Cual es el nombre del periferico preferido al momento de interactuar con la computadora");
    //this.artyom.simulateInstruction("Hello");
  }
}
