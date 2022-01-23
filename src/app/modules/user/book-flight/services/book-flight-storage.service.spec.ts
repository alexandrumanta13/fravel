import { TestBed } from '@angular/core/testing';

import { BookFlightStorageService } from './book-flight-storage.service';

describe('BookFlightStorageService', () => {
  let service: BookFlightStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFlightStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
