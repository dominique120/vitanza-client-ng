import { TestBed } from '@angular/core/testing';

import { FilterinstallationService } from './filterinstallation.service';

describe('FilterinstallationService', () => {
  let service: FilterinstallationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterinstallationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
