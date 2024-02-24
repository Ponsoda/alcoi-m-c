import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {
  @Output() selectionChange: EventEmitter<number> = new EventEmitter<number>();

  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]; // TODO: add years from api call
  selectedYear: number;

  onSelectionChange(event: any): void {
    this.selectedYear = event.target.value;
    this.selectionChange.emit(this.selectedYear);
  }
}
