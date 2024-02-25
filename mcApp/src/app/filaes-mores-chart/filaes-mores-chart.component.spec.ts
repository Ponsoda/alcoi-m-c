import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaesMoresChartComponent } from './filaes-mores-chart.component';

describe('FilaesMoresChartComponent', () => {
  let component: FilaesMoresChartComponent;
  let fixture: ComponentFixture<FilaesMoresChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaesMoresChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilaesMoresChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
