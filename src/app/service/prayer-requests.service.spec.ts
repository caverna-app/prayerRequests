import { TestBed } from '@angular/core/testing';

import { PrayerRequestsService } from './prayer-requests.service';

describe('PrayerRequestsService', () => {
  let service: PrayerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
