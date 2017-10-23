/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlService]
    });
  });

  it('should ...', inject([UrlService], (service: UrlService) => {
    expect(service).toBeTruthy();
  }));
});
