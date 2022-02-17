import { TestBed } from '@angular/core/testing';

import { CompteUserService } from './compte-user.service';

describe('CompteUserService', () => {
  let service: CompteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
