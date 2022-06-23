import { TestBed } from '@angular/core/testing';

import { SelectDateService } from './select-date.service';

describe('SelectDateService', () => {
  let service: SelectDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
