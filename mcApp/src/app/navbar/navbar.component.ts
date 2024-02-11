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
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  years: number[] = [2014, 2015, 2016];
  selectedYear: number = this.years[0];

  onSelectionChange(event: any): void {
    // const selectedValue: string = event.target.value;
    // this.selectionChange.emit(selectedValue);
    this.selectedYear = event.target.value;
  }
}
