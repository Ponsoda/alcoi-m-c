import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Navbar } from './navbar/navbar.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HistoricChartComponent } from './historic-chart/historic-chart.component';
import { FilaesChartComponent } from './filaes-chart/filaes-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieChartComponent, HistoricChartComponent, Navbar, HttpClientModule, FilaesChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Moros i Cristians d'Alcoi";
  types: string[] = ['associats', 'junta', 'primersTrons', 'majorals', 'cuadroHonor', 'personatgesFesters']

  selectedYear: number = 2022;

  onDropdownSelectionChange(selectedYear: number): void {
    this.selectedYear = selectedYear;
  }
}
