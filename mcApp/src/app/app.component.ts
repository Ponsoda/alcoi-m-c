import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Navbar } from './navbar/navbar.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieChartComponent, Navbar, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Moros i Cristians d'Alcoi";
  any: number = 0;
  items: number[] = [2014, 2015, 2016];
  types: string[] = ['associats', 'primersTrons', 'majorals', 'cuadroHonor', 'personatgesFesters']

  selectedYear: string = '';

  onDropdownSelectionChange(value: string): void {
    this.selectedYear = value;
  }
}
