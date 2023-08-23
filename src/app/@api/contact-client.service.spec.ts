/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactClientService } from './contact-client.service';

describe('Service: ContactClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactClientService]
    });
  });

  it('should ...', inject([ContactClientService], (service: ContactClientService) => {
    expect(service).toBeTruthy();
  }));
});
