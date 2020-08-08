import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNotificationComponent } from './delivery-notification.component';

describe('DeliveryNotificationComponent', () => {
  let component: DeliveryNotificationComponent;
  let fixture: ComponentFixture< DeliveryNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
