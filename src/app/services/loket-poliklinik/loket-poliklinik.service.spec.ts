import { TestBed } from '@angular/core/testing';

import { LoketPoliklinikService } from './loket-poliklinik.service';

describe('LoketPoliklinikService', () => {
  let service: LoketPoliklinikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoketPoliklinikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
