import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../app.breadcrumb.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Utils} from "../../../util/Utils";

@Component({
  selector: 'app-timereport',
  templateUrl: './timereport.component.html',
  styleUrls: ['./timereport.component.scss']
})
export class TimereportComponent implements OnInit {
  dataReviews: any;
  globalUri: string | null = "";

  /*Gráfica*/
  lineData: any;
  barData: any;
  pieData: any;
  polarData: any;
  radarData: any;
  lineOptions: any;
  barOptions: any;
  pieOptions: any;
  polarOptions: any;
  radarOptions: any;


  constructor(private breadcrumbService: BreadcrumbService,
              private _http: HttpClient,
              private utils: Utils,
  ) {
    this.breadcrumbService.setItems([
      {label: '', routerLink: ['/app/']},
      {label: 'Revisión de Tiempo', routerLink: ['/app/reports/timereport']},
    ]);
  }

  ngOnInit() {
    this.loadgetReviews();

  }

  loadgetReviews() {
    console.log("DATA EVALUATION")
    this.apiGetDataReview(5).subscribe({
      next: response => {
        this.dataReviews = response.data;
        this.viewBarReport();
        this.viewGeneralReport();
      }
    })
  }

  apiGetDataReview(type: any): Observable<any> {
    this.globalUri = this.utils.globalUrl + "personsevaluations/getpersonsevaluations";
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('token', this.utils.token);
    let queryParams = new HttpParams()
      .append("type", type)
      .append("id_evaluation", 0);
    return this._http.get<any>(this.globalUri, {params: queryParams, headers: headers});

  }
  viewBarReport() {
    let timespent_person_evaluation : number[] = [];
    let qualification_person_evaluation : number[] = [];
    let name_evaluation : string[] = [];

    for (let i = 0; i < this.dataReviews.length; i++) {
      timespent_person_evaluation[i] = this.dataReviews[i].timespent_person_evaluation;
      qualification_person_evaluation[i] = this.dataReviews[i].qualification_person_evaluation;
      name_evaluation[i] = (this.dataReviews[i].name_evaluation + "-"+ this.dataReviews[i].name_course);
    }
    this.barData = {
      labels: name_evaluation,
      datasets: [
        {
          label: 'Promedio de Tiempo empleado (minutos)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: timespent_person_evaluation
        },
        {
          label: 'Promedio de Puntaje obetenido',
          backgroundColor: 'rgb(92,88,220)',
          borderColor: 'rgb(3,38,133)',
          data: qualification_person_evaluation
        }
        ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };
  }
  viewGeneralReport(){
    let timespent_person_evaluation : number[] = [];
    let qualification_person_evaluation : number[] = [];
    let name_evaluation : string[] = [];

    for (let i = 0; i < this.dataReviews.length; i++) {
      timespent_person_evaluation[i] = this.dataReviews[i].timespent_person_evaluation;
      qualification_person_evaluation[i] = this.dataReviews[i].qualification_person_evaluation;
      name_evaluation[i] = (this.dataReviews[i].name_evaluation + "-"+ this.dataReviews[i].name_course);
    }

    this.lineData = {
      labels: name_evaluation,
      datasets: [
        {
          label: 'First Dataset',
          data: timespent_person_evaluation,
          fill: false,
          backgroundColor: 'rgb(255, 205, 86)',
          borderColor: 'rgb(255, 205, 86)',
          tension: .4
        },
        {
          label: 'Promedio de Puntaje obetenido',
          data: qualification_person_evaluation,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: .4
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color:  'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color:  'rgba(160, 167, 181, .3)',
          }
        },
      }
    };

    this.pieData = {
      labels: name_evaluation,
      datasets: [
        {
          data: timespent_person_evaluation,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      }
    };

    this.polarData = {
      datasets: [{
        data: timespent_person_evaluation,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)'
        ],
        label: 'Promedio de tiempo empleado (min)'
      }],
      labels:
        name_evaluation
    };

    this.polarOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(160, 167, 181, .3)'
          }
        }
      }
    };

    this.radarData = {
      labels: name_evaluation,
      datasets: [
        {
          label: 'Promedio de tiempo empleado (min)',
          backgroundColor: 'rgba(54, 162, 235,0.2)',
          borderColor: 'rgba(54, 162, 235,1)',
          pointBackgroundColor: 'rgba(54, 162, 235,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235,1)',
          data: timespent_person_evaluation
        },
        {
          label: 'Promedio de Puntaje obetenido',
          backgroundColor: 'rgba(255, 99, 132,0.2)',
          borderColor: 'rgba(255, 99, 132,1)',
          pointBackgroundColor: 'rgba(255, 99, 132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132,1)',
          data: qualification_person_evaluation
        }
      ]
    };

    this.radarOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(160, 167, 181, .3)'
          }
        }
      }
    };
  }
}
