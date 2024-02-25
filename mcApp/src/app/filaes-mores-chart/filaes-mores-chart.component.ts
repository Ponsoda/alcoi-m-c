import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { donesColor, homesColor, graphsRatio } from '../general_config';

@Component({
  selector: 'app-filaes-mores-chart',
  standalone: true,
  imports: [],
  templateUrl: './filaes-mores-chart.component.html',
  styleUrl: './filaes-mores-chart.component.scss'
})

export class FilaesMoresChartComponent implements OnInit {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public filaesMoresChart : any;
  public chartName: string = "Dades de la directiva de cada filà mora al 2022";
  dataHistoricDones: number[] = [];
  dataHistoricHomes: number[] = [];
  chartCtx: string = 'filaesMoresChart';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHistoricData();
  }

  loadHistoricData(): void {

    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/elnostre/guia2022/dades2022_filaes.json`, { headers: this.headers }).subscribe(
      (data) => {

        let filaesLabels: string[] = [];
        let dataDones: number[] = [];
        let dataHomes: number[] = [];

        filaesLabels = Object.keys(data['moros'])
        for (let fila of filaesLabels) {
          dataDones.push(data['moros'][fila]['dones'])
          dataHomes.push(data['moros'][fila]['homes'])
        }

        const totalData = dataDones.map((_, index) => dataDones[index] + dataHomes[index]);

        const percentageDataHomes = dataHomes.map((value, index) => (value / totalData[index]) * 100);
        const percentageDataDones = dataDones.map((value, index) => (value / totalData[index]) * 100);
        
        this.createFilaesChart(percentageDataDones, percentageDataHomes, filaesLabels);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  createFilaesChart(dataDones: number[], dataHomes: number[], filaes: string[]){

    this.filaesMoresChart = new Chart(this.chartCtx, {
      type: 'bar',
      data: {
        labels: filaes,
         datasets: [{
          label: 'Dones',
          data: dataDones,
          backgroundColor: [
            donesColor,
          ]
        },
        {
          label: 'Homes',
          data: dataHomes,
          backgroundColor: [
            homesColor,
          ]
        }],
        },
        options: {
          aspectRatio:graphsRatio,
          scales: {
            x: { stacked: true },
            y: { stacked: true,
              ticks: {
                callback: (value) => `${value}%`,
              }, 
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${label}: ${value.toFixed(2)}%`;
                },
              },
            },
          },
        }
    });
  }
}
