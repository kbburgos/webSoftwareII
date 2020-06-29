import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachadosComponent } from './despachados.component';

describe('DespachadosComponent', () => {
  let component: DespachadosComponent;
  let fixture: ComponentFixture<DespachadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
