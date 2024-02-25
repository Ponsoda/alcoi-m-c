import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasComponent } from './offcanvas.component';

@NgModule({
  declarations: [OffcanvasComponent],
  imports: [CommonModule],
  exports: [OffcanvasComponent],
})
export class OffcanvasModule {}