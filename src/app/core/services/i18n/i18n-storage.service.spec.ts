import { TestBed } from '@angular/core/testing';

import { I18nStorageService } from './i18n-storage.service';

describe('I18nStorageService', () => {
  let service: I18nStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
