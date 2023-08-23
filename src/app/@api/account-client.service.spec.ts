/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountClientService } from './account-client.service';

describe('Service: AccountClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountClientService]
    });
  });

  it('should ...', inject([AccountClientService], (service: AccountClientService) => {
    expect(service).toBeTruthy();
  }));
});
