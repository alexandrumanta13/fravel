import { TestBed } from '@angular/core/testing';

import { RoutesStorageService } from './routes-storage.service';

describe('RoutesStorageService', () => {
  let service: RoutesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
