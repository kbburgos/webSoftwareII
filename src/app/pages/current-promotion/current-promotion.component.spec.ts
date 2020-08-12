import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPromotionComponent } from './current-promotion.component';

describe('CurrentPromotionComponent', () => {
  let component: CurrentPromotionComponent;
  let fixture: ComponentFixture<CurrentPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
