import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesComponent } from './report-sales.component';

describe('UserProfileComponent', () => {
  let component: ReportSalesComponent;
  let fixture: ComponentFixture<ReportSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
