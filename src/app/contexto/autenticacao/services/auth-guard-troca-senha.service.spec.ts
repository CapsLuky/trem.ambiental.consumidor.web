import { TestBed } from '@angular/core/testing';

import { AuthGuardTrocaSenhaService } from './auth-guard-troca-senha.service';

describe('AuthGuardTrocaSenhaService', () => {
  let service: AuthGuardTrocaSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardTrocaSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
