import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Navbar } from './navbar/navbar.component';
import { AssociacioChartComponent } from './associacio-chart/associacio-chart.component';
import { HistoricChartComponent } from './historic-chart/historic-chart.component';
import { FilaesCristianesChartComponent } from './filaes-cristianes-chart/filaes-cristianes-chart.component';
import { FilaesMoresChartComponent } from './filaes-mores-chart/filaes-mores-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AssociacioChartComponent, HistoricChartComponent, Navbar, HttpClientModule, FilaesCristianesChartComponent, FilaesMoresChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Moros i Cristians d'Alcoi";
  types: string[] = ['associats', 'junta', 'primersTrons', 'majorals', 'cuadroHonor', 'personatgesFesters']

  selectedYear: number = 2014;
  years: number[];

  onDropdownSelectionChange(selectedYear: number): void {
    this.selectedYear = selectedYear;
  }

  handleOutputChange(newValue: number[]): void {
    this.years = newValue;
  }

  offcanvasVisible: boolean = false;

}
