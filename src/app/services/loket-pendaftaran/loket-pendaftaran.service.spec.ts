import { TestBed } from '@angular/core/testing';

import { LoketPendaftaranService } from './loket-pendaftaran.service';

describe('LoketPendaftaranService', () => {
  let service: LoketPendaftaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoketPendaftaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
