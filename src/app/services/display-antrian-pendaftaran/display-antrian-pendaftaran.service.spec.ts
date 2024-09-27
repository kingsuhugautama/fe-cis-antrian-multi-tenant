import { TestBed } from '@angular/core/testing';

import { DisplayAntrianPendaftaranService } from './display-antrian-pendaftaran.service';

describe('DisplayAntrianPendaftaranService', () => {
  let service: DisplayAntrianPendaftaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayAntrianPendaftaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
