import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-filaes-chart',
  standalone: true,
  imports: [],
  templateUrl: './filaes-chart.component.html',
  styleUrl: './filaes-chart.component.scss'
})

export class FilaesChartComponent implements OnInit {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public filaesChart : any;
  public chartName: string = "Dades per filà al 2022";
  dataHistoricDones: number[] = [];
  dataHistoricHomes: number[] = [];
  filaes: string[];

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.loadHistoricData();
  }

  loadHistoricData(): void {

    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/elnostre/guia2022/dades2022.json`, { headers: this.headers }).subscribe(
      (data) => {
        
        this.filaes = Object.keys(data)

        for (let fila of this.filaes) {
          this.dataHistoricDones.push(data[fila]['dones'])
          this.dataHistoricHomes.push(data[fila]['homes'])
        }
        
        this.createHistoricChart(this.dataHistoricDones, this.dataHistoricHomes, this.filaes);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  createHistoricChart(dataDones: number[], dataHomes: number[], filaes: string[]){

    this.filaesChart = new Chart('filaesChart', {
      type: 'bar',
      data: {
        labels: filaes,
         datasets: [{
          label: 'Dones',
          data: dataDones,
          backgroundColor: [
            '#ffc0cb8f',
          ]
        },
        {
          label: 'Homes',
          data: dataHomes,
          backgroundColor: [
            '#0000ff87',
          ]
        }],
        },
        options: {
          aspectRatio:2
        }
    });
  }
}
