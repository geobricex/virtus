import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../app.breadcrumb.service";

declare var Artyom: any;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  valRadio: string;

  private artyom: any = new Artyom();

  public listQuestions: any = [
    {
      "question": "¿Cual es el nombre del periferico preferido al momento de interactuar con la computadora?",
      "type": "optionSimple",
      "points": 5,
      "resolve": false,
      "options": [
        {
          "content": "Mouse",
          "trueResponse": false,
          "response": true
        },
        {
          "content": "Impresora",
          "trueResponse": false,
          "response": true
        },
        {
          "content": "teclado",
          "trueResponse": false,
          "response": false
        }
      ]
    }
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Cuestionario', routerLink: ['/app/questionnaire']}
    ]);
  }

  ngOnInit(): void {
  }

  totalPuntos():number[]{
    let total: number = 0;
    let resueltas: number = 0;
    for (let ind = 0; ind < this.listQuestions.length; ind++){
      total+= this.listQuestions[ind].points;
      resueltas+=1;
    }
    return [total, resueltas, this.listQuestions.length];
  }

}
