import { TestBed } from '@angular/core/testing';

import { AuthDeliverymanGuard } from './auth-deliveryman.guard';

describe('AuthDeliverymanGuard', () => {
  let guard: AuthDeliverymanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthDeliverymanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
