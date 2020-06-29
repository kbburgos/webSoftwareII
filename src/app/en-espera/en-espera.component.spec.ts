import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnEsperaComponent } from './en-espera.component';

describe('UserProfileComponent', () => {
  let component: EnEsperaComponent;
  let fixture: ComponentFixture<EnEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
