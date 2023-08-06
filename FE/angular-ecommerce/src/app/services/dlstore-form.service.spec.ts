import { TestBed } from '@angular/core/testing';

import { DLStoreFormService } from './dlstore-form.service';

describe('DLStoreFormService', () => {
  let service: DLStoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DLStoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
