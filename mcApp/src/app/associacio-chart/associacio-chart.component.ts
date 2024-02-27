import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { donesColor, homesColor, graphsRatio } from '../general_config';

@Component({
  selector: 'app-associacio-chart',
  standalone: true,
  imports: [],
  templateUrl: './associacio-chart.component.html',
  styleUrl: './associacio-chart.component.scss'
})

export class AssociacioChartComponent implements OnInit {
  @Input() selectedYear!: number;

  onDropdownSelectionChange(value: number): void {
    this.selectedYear = value;
  }

  public chart: any;
  public chartHistoric: any;
  public chartName: string = "Dades associació";

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    // this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedYear']) {
      this.destroyChart();
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadData(): void {
    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/associacioSantJordi/revista${Number(this.selectedYear) + 1}/dades${this.selectedYear}.json`).subscribe(
      (data) => {

        let associacioLabels: string[] = [];
        let dataDones: number[] = [];
        let dataHomes: number[] = [];
        
        associacioLabels = Object.keys(data)
        
        for(var label of associacioLabels) {
          dataDones.push(data[label]['dones']) 
          dataHomes.push(data[label]['homes'])
        }

        const totalData = dataDones.map((_, index) => dataDones[index] + dataHomes[index]);

        const percentageDataHomes = dataHomes.map((value, index) => (value / totalData[index]) * 100);
        const percentageDataDones = dataDones.map((value, index) => (value / totalData[index]) * 100);
        
        this.createChart(percentageDataDones, percentageDataHomes, associacioLabels);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  createChart(dataDones: number[], dataHomes: number[], associacio: string[]){
    this.chart = new Chart('chartAssociacio', {
      type: 'bar',
      data: {
        labels: associacio,
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