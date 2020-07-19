import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictingComponent } from './conflicting.component';

describe('ConflictingComponent', () => {
  let component: ConflictingComponent;
  let fixture: ComponentFixture< ConflictingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
