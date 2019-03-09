import { TestBed, inject } from '@angular/core/testing';

import { IKnowService } from './i-know.service';

describe('IKnowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IKnowService]
    });
  });

  it('should be created', inject([IKnowService], (service: IKnowService) => {
    expect(service).toBeTruthy();
  }));
});
