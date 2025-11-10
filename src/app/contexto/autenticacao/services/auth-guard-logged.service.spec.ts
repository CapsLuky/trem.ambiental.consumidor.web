import { TestBed } from '@angular/core/testing';

import { AuthGuardLoggedService } from './auth-guard-logged.service';

describe('AuthGuardLoggedService', () => {
  let service: AuthGuardLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
