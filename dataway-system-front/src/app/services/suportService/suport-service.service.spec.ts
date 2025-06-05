import { TestBed } from '@angular/core/testing';

import { SuportServiceService } from './suport-service.service';

describe('SuportServiceService', () => {
  let service: SuportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
