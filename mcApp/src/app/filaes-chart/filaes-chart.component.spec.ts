import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaesChartComponent } from './filaes-chart.component';

describe('FilaesChartComponent', () => {
  let component: FilaesChartComponent;
  let fixture: ComponentFixture<FilaesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilaesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
