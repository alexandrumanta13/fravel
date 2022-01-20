import { TestBed } from '@angular/core/testing';

import { GdprResolver } from './gdpr.resolver';

describe('GdprResolver', () => {
  let resolver: GdprResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GdprResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
