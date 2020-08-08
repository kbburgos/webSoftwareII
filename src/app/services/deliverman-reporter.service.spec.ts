import { TestBed } from '@angular/core/testing';

import { DelivermanReporterService } from './deliverman-reporter.service';

describe('DelivermanReporterService', () => {
  let service: DelivermanReporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelivermanReporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
