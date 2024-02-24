import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  @Input() type!: string;
  @Input() selectedYear!: number;

  onDropdownSelectionChange(value: number): void {
    this.selectedYear = value;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  public chart: any;
  public chartHistoric  : any;
  public chartName: string;
  chartLabels: string[] = [];

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedYear']) {
      // this.loadData();
      this.createChart(1, 1);
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
    this.http.get<any>(`https://raw.githubusercontent.com/Ponsoda/alcoi-m-c-dades/main/associacioSantJordi/revista${Number(this.selectedYear) + 1}/dades${this.selectedYear}.json`, { headers: this.headers }).subscribe(
      (data) => {
        this.createChart(data[this.type]['dones'], data[this.type]['homes']);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  createChart(dataDones: number, dataHomes: number){

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.type, {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Dones', 'Homes'],
	       datasets: [{
    label: 'Gender',
    data: [dataDones, dataHomes],
    backgroundColor: [
      '#ffc0cb8f',
      '#0000ff87',
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