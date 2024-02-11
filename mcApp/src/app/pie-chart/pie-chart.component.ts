import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit {
  @Input() any!: number;
  @Input() type!: string;
  @Input() selectedYear!: string;

  onDropdownSelectionChange(value: string): void {
    this.selectedYear = value;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public chart: any;
  public chartName: string = 'chartname';
  dataDones: number = 0;
  dataHomes: number = 0;
  chartLabels: string[] = [];

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/associacioSantJordi/revista${this.any + 1}/dades${this.any}.json`, { headers: this.headers }).subscribe(data => {
      this.dataDones = data[this.type]['dones'];
      this.dataHomes = data[this.type]['homes'];
      this.createChart(this.dataDones, this.dataHomes);
    }) 
  }

  createChart(dataDones: number, dataHomes: number){

    this.chart = new Chart(this.type, {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Dones', 'Homes'],
	       datasets: [{
    label: 'Gender',
    data: [dataDones, dataHomes],
    backgroundColor: [
      'pink',
      'blue',
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2
      }

    });
  }
}
