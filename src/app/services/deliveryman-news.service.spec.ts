import { TestBed } from '@angular/core/testing';

import { DeliverymanNewsService } from './deliveryman-news.service';

describe('DeliverymanNewsService', () => {
  let service: DeliverymanNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverymanNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
