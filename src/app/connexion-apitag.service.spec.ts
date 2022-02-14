import { TestBed } from '@angular/core/testing';

import { ConnexionAPITAGService } from './connexion-apitag.service';

describe('ConnexionAPITAGService', () => {
  let service: ConnexionAPITAGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionAPITAGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
