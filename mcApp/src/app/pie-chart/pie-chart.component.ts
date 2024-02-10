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

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public chart: any;
  public chartName: string = 'chartname';
  dataDones: number = 0;
  dataHomes: number = 0;
  chartLabels: string[] = [];
  public type : string = 'associats'

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    // this.dataService.getJsonData().subscribe(data => {
    //   // Assuming your JSON structure is like { "labels": [...], "data": [...] }
    //   console.log(data)
    //   // this.chartLabels = data.labels;
    //   // this.chartData = data.data;
    // });
    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/associacioSantJordi/revista${this.any + 1}/dades${this.any}.json`, { headers: this.headers }).subscribe(data => {
      // for (let i of Object.keys(data)) {
      //   console.log(i)
      //   this.dataDones = data[i]['dones'];
      //   this.dataHomes = data[i]['homes'];
      //   console.log(this.dataDones);
      //   console.log(this.dataHomes);
      //   this.createChart(this.dataDones, this.dataHomes);
      // }
    this.dataDones = data[this.type]['dones'];
    this.dataHomes = data[this.type]['homes'];
    this.createChart(this.dataDones, this.dataHomes);


  }) 
  }

  createChart(dataDones: number, dataHomes: number){

    this.chart = new Chart(this.any.toString(), {
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
        aspectRatio:5
      }

    });
  }
}
