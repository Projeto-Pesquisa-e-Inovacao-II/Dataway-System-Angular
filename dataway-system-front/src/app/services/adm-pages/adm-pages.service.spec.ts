import { TestBed } from '@angular/core/testing';

import { AdmPagesService } from './adm-pages.service';

describe('AdmPagesService', () => {
  let service: AdmPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
