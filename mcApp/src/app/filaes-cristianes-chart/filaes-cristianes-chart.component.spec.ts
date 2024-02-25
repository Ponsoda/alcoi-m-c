import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaesCristianesChartComponent } from './filaes-cristianes-chart.component';

describe('FilaesCristianesChartComponent', () => {
  let component: FilaesCristianesChartComponent;
  let fixture: ComponentFixture<FilaesCristianesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaesCristianesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilaesCristianesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
