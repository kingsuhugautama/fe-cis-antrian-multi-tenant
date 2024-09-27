import { TestBed } from '@angular/core/testing';

import { PilihLoketService } from './pilih-loket.service';

describe('PilihLoketService', () => {
  let service: PilihLoketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilihLoketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
