import { TestBed } from '@angular/core/testing';

import { Supabas } from './supabas';

describe('Supabas', () => {
  let service: Supabas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supabas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
