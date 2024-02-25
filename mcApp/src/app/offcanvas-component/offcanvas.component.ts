import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offcanvas',
  template: `
    <div class="offcanvas" [class.show]="showOffcanvas">
      <div class="offcanvas-content">
        <button class="close-btn" (click)="closeOffcanvas()">Close</button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .offcanvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s;
    }

    .offcanvas.show {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease-in-out, visibility 0s linear 0s;
    }

    .offcanvas-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      background: none;
      border: none;
      font-size: 16px;
      color: #333;
    }
  `],
})
export class OffcanvasComponent {
  @Input() showOffcanvas: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeOffcanvas(): void {
    this.showOffcanvas = false;
    this.close.emit();
  }
}