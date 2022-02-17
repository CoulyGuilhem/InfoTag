import { TestBed } from '@angular/core/testing';

import { ConnexionApitagService } from './connexion-apitag.service';

describe('ConnexionApitagService', () => {
  let service: ConnexionApitagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionApitagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
