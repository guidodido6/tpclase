import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rutaProtegidaGuard } from './rutaprotegida.guard';

describe('rutaprotegidaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rutaProtegidaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
