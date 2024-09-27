import { TestBed } from '@angular/core/testing';

import { CetakTiketPendaftaranService } from './cetak-tiket-pendaftaran.service';

describe('CetakTiketPendaftaranService', () => {
  let service: CetakTiketPendaftaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CetakTiketPendaftaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
