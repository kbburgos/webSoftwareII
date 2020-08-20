import { TestBed } from '@angular/core/testing';

import { AuthDeliverymanService } from './auth-deliveryman.service';

describe('AuthDeliverymanService', () => {
  let service: AuthDeliverymanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDeliverymanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
