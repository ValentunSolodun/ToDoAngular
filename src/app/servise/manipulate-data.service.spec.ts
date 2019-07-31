import { TestBed } from '@angular/core/testing';

import { ManipulateDataService } from './manipulate-data.service';

describe('ManipulateDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManipulateDataService = TestBed.get(ManipulateDataService);
    expect(service).toBeTruthy();
  });
});
