import { TestBed } from '@angular/core/testing';

import { DisplayAntrianPoliklinikService } from './display-antrian-poliklinik.service';

describe('DisplayAntrianPoliklinikService', () => {
  let service: DisplayAntrianPoliklinikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayAntrianPoliklinikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
