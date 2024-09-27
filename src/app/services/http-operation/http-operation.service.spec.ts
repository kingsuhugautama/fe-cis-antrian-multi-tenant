import { TestBed } from '@angular/core/testing';

import { HttpOperationService } from './http-operation.service';

describe('HttpOperationService', () => {
  let service: HttpOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
