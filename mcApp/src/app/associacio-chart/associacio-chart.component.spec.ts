import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacioChartComponent } from './associacio-chart.component';

describe('PieChartComponent', () => {
  let component: AssociacioChartComponent;
  let fixture: ComponentFixture<AssociacioChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociacioChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociacioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
