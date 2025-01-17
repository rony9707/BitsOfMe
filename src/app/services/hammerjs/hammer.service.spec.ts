import { TestBed } from '@angular/core/testing';

import { HammerService } from './hammer.service';

describe('HammerService', () => {
  let service: HammerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HammerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
