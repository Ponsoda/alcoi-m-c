import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { donesColor, homesColor, graphsRatio } from '../general_config';


@Component({
  selector: 'app-historic-chart',
  standalone: true,
  imports: [],
  templateUrl: './historic-chart.component.html',
  styleUrl: './historic-chart.component.scss'
})

export class HistoricChartComponent implements OnInit {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public chartHistoric : any;
  public chartName: string = "Dades històriques";
  dataHistoricDones: number[] = [];
  dataHistoricHomes: number[] = [];
  years: string[];
  chartCtx: string = 'historicChart';

  constructor(private http: HttpClient) { 
  }

  @Output() outputVariableChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  ngOnInit(): void {
    this.loadHistoricData();
  }

  loadHistoricData(): void {
    // Make your API call here using this.dataToFetch
    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/associacioSantJordi/dadesHistoriques.json`, { headers: this.headers }).subscribe(
      (data) => {
        
        this.years = Object.keys(data['associats'])

        this.outputVariableChange.emit(this.years.map((value) => Number(value)).sort((a, b) => b - a));

        for (let year of this.years) {
          this.dataHistoricDones.push(data['associats'][year]['dones'])
          this.dataHistoricHomes.push(data['associats'][year]['homes'])
        }
        
        this.createHistoricChart(this.dataHistoricDones, this.dataHistoricHomes, this.years);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  createHistoricChart(dataDones: number[], dataHomes: number[], years: string[]){

    this.chartHistoric = new Chart(this.chartCtx, {
      type: 'line',
      data: {
        labels: years,
         datasets: [{
          label: 'Dones',
          data: dataDones,
          fill: true,
          backgroundColor: [
            donesColor,
          ]
        },
        {
          fill:true,
          label: 'Homes',
          data: dataHomes,
          backgroundColor: [
            homesColor,
          ]
        }],
        },
        options: {
          aspectRatio:graphsRatio
        }
    });
  }
}
