import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoldComponent } from './on-hold.component';

describe('UserProfileComponent', () => {
  let component: OnHoldComponent;
  let fixture: ComponentFixture<OnHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
