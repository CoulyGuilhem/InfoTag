import { TestBed } from '@angular/core/testing';

import { LocaleDatabaseService } from './locale-database.service';

describe('LocaleDatabaseService', () => {
  let service: LocaleDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
