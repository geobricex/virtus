import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../services/cargar-scripts.service';

declare var Artyom: any;

@Component({
  selector: 'app-testvoice',
  templateUrl: './testvoice.component.html',
  styleUrls: ['./testvoice.component.css']
})
export class TestvoiceComponent implements OnInit {

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
    var artyom = new Artyom();
    artyom.fatality();
    setTimeout(function () {

      artyom.initialize({
        lang: "es-ES",
        continuous: true, // Artyom will listen forever
        debug: false, // Show what recognizes in the Console
        listen: true, // Start listening after this
        speed: 0.9, // Talk a little bit slow
        mode: "normal" // This parameter is not required as it will be normal by default
      }).then(function () {
        console.log("Ready to work!");
      });

      artyom.addCommands([
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
      ]);

      // Or the artisan mode to write less

      artyom.on(["Good morning"]).then(function (i: any) {
        console.log("Triggered");
      });

      artyom.say("Buenos días, indique el literal correcto");

      artyom.say("buenos dias", {
        onStart: function () {
          console.log("Talking ...");
        },
        onEnd: function () {
          console.log("I said all that i knew");
        }
      });

      var UserDictation = artyom.newDictation({
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

      UserDictation.start();
      artyom.simulateInstruction("conejo");
    }, 250);
  }
}
