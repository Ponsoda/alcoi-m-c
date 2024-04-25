import { Component, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasModule } from '../offcanvas-component/offcanvas.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, OffcanvasModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {
  @Input() years: number[];
  @Output() selectionChange: EventEmitter<number> = new EventEmitter<number>();

  selectedYear: number | undefined;
  offcanvasVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['years'] && this.years && this.years.length > 0 && this.selectedYear === undefined) {
      // If 'years' input is changed and has values, set the initial value for 'selectedYear'
      this.selectedYear = this.years[0];
      this.selectionChange.emit(this.selectedYear);
    }
  }

  onSelectionChange(event: any): void {
    this.selectedYear = event.target.value;
    this.selectionChange.emit(this.selectedYear);
  }

  showOffcanvas(): void {
    this.offcanvasVisible = true;
  }

  closeOffcanvas(): void {
    this.offcanvasVisible = false;
  }

}
